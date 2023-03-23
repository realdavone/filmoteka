import { io } from '../io.js'

import { getEpisodeData, getOMDBTitle, getTMDBTitle, getVideoData } from '../features/fetch/api.js'

import Title from '../schemas/Title.js'
import RecommendedTitle from '../schemas/RecommendedTitle.js'
import { handleLikeOrDislike, getTitleFromDb, createTitle, handleNonWorkingPlayer, updateTitle } from '../features/db/title.js'

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
    
    const isRecommended = await RecommendedTitle.findOne({ title: foundTitle._id })
    res.status(200).json({
      ...data,
      omdb: { ...omdbData },
      ...foundTitle?._doc,
      isRecommended: isRecommended === null ? false : true
    })    
  } catch (error) { res.status(500).json({ success: false, message: 'Niečo sa pokazilo' }) }
}

export const getRecommended = async (req, res) => {
  const titles = await RecommendedTitle.find().populate('title').sort({ createdAt: 'descending' }).limit(16)
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

  let title = await updateTitle(type, id, { img: req.body.img })

  if(title === null) title = await Title.create(req.body)

  let recommended = await RecommendedTitle.findOne({ title: title._id })

  if(recommended) return res.status(400).json({ success: false, message: 'Toto dielo sa už nachádza v doporučených' })

  try {
    recommended = await RecommendedTitle.create({ title: title._id })
    recommended = await recommended.populate('title')

    const foundRecommended = await RecommendedTitle.find().sort({ createdAt: 'descending' })

    if(foundRecommended.length > 16){
      let objects = []
      foundRecommended.splice(16).forEach(element => (objects = [...objects, element._id ]))
      await RecommendedTitle.deleteMany({ _id: { $in: objects } });
    }

    io.emit('newRecommended', { title: recommended })
    res.status(201).json({ success: true, isRecommended: true })
    
  } catch (error) { res.sendStatus(500) }
}

export const removeRecommendedTitle = async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) return res.sendStatus(403)
  
  try {
    await RecommendedTitle.findByIdAndDelete(req.body.id)
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

  try {
    const title = await getTitleFromDb(type, id)
    if(title === null) await Title.create({ type, id })

    if(action !== 'like' && action !== 'dislike') return res.status(400).json({ success: false, message: 'Nesprávna akcia' })

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
    const titles = await Title.find({ 'likes.0': { '$exists': true } }).sort({ 'likes': -1 }).limit(10)
    res.json(titles)
  } catch (error) { res.sendStatus(500) }
}