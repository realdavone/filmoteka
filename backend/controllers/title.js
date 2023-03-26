import { io } from '../io.js'

import {
  getEpisodeData,
  getOMDBTitle,
  getTMDBTitle,
  getVideoData
} from '../services/fetch/api.js'

import {
  handleLikeOrDislike,
  getTitleFromDb,
  createTitle,
  handleNonWorkingPlayer,
  updateTitle,
  getRecommendedTitle,
  createRecommendedTitle,
  getRecommendedTitles,
  removeRecommendedTitles,
  getMostLikedTitles,
  deleteRecommendedTitle
} from '../services/db/title.js'

const MAX_RECOMMENDED = 16

export const getTitle = async (req, res) => {
  const { type, id } = req.params

  try {
    const data = await getTMDBTitle(type, id)
    if(data.success === false) return res.status(404).json({ success: false, message: data.status_message })
  
    const omdbData = await getOMDBTitle(data.external_ids.imdb_id)
  
    const foundTitle = await getTitleFromDb(type, id)
    if(foundTitle === null)
      return res.json({
        ...data,
        omdb: { ...omdbData },
        ...foundTitle?._doc,
        isRecommended: false
      })
    
    const isRecommended = await getRecommendedTitle(foundTitle._id)
    res.status(200).json({
      ...data,
      omdb: { ...omdbData },
      ...foundTitle?._doc,
      isRecommended: isRecommended === null ? false : true
    })    
  } catch (error) { res.status(500).json({ success: false, message: 'Niečo sa pokazilo' }) }
}

export const getRecommended = async (req, res) => {
  const titles = await getRecommendedTitles({ sorted: true })
  res.status(200).json(titles)
}

export const toggleNonWorkingTitle = async (req, res) => {
  const { type, id } = req.body
  const foundTitle = await getTitleFromDb(type, id)

  try {
    if(foundTitle === null) {
      await createTitle({ ...req.body, isPlayerWorking: false })
      return res.status(201).json({
        success: true,
        isPlayerWorking: false
      })
    }

    const updatedTitle = await handleNonWorkingPlayer(type, id)

    return res.status(201).json({ success: true, isPlayerWorking: updatedTitle.isPlayerWorking })  
  } catch (error) {
    res.sendStatus(500)
  }
}

export const addRecommendedTitle = async (req, res) => {
  const { type, id } = req.body

  let title = await updateTitle(type, id, {
    img: req.body.img
  })

  if(title === null)
    title = await createTitle(req.body)

  let recommended = await getRecommendedTitle(title._id)
  if(recommended)
    return res.status(400).json({ success: false, message: 'Toto dielo sa už nachádza v doporučených' })

  try {
    recommended = await createRecommendedTitle(title._id)
    recommended = await recommended.populate('title')

    const foundRecommended = await getRecommendedTitles({ sorted: true })

    if(foundRecommended.length > MAX_RECOMMENDED){
      let titles = []
      foundRecommended.splice(MAX_RECOMMENDED).forEach(element => (
        titles = [...titles, element._id ]
      ))
      await removeRecommendedTitles(titles)
    }

    io.emit('newRecommended', { title: recommended })
    res.status(201).json({ success: true, isRecommended: true })
    
  } catch (error) { res.sendStatus(500) }
}

export const removeRecommendedTitle = async (req, res) => {
  try {
    await deleteRecommendedTitle(req.body.id)
    
    res.status(200).json({ success: true })
  } catch (error) { res.sendStatus(500) }
}

export const getEpisode = async (req, res) => {
  const { id, season, episode } = req.params
  try {
    const data = await getEpisodeData(id, season, episode)
    res.status(200).json(data)
  } catch (error) { res.sendStatus(500) }
}

export const rateTitle = async (req, res) => {
  const { id: userId } = req.user
  const { action, type, id } = req.body

  const actions = ['like', 'dislike']

  try {
    const title = await getTitleFromDb(type, id)
    if(title === null) await createTitle({ type, id })

    if(!actions.includes(action)) return res.status(400).json({ success: false, message: 'Nesprávna akcia' })

    await handleLikeOrDislike(type, id, action, userId)
  
    res.status(200).json({ success: true })
  } catch (error) { res.sendStatus(500) }
}

export const getVideo = async (req, res) => {
  try {
    const data = await getVideoData(req.params.type, req.params.id)
    res.status(200).json(data)    
  } catch (error) { res.sendStatus(500) }
}

export const getMostLiked = async (req, res) => {
  try {
    const titles = await getMostLikedTitles()
    res.json(titles)
  } catch (error) { res.sendStatus(500) }
}