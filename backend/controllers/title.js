import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { io } from '../io.js'

import Title from '../schemas/Title.js'
import RecommendedTitle from '../schemas/RecommendedTitle.js'

dotenv.config()

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY
const OMDB_API_KEY = process.env.OMDB_API_KEY

export const getTitle = async (req, res) => {
  const { type, id } = req.params

  try {
    const response = await fetch(`${TMDB_BASE_API}/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,recommendations,external_ids,translations,content_ratings&language=sk-SK`)
    const data = await response.json()
  
    if(data.success === false) return res.status(404).json({ success: false, message: data.status_message })
  
    const omdbResponse = await fetch(`https://www.omdbapi.com/?i=${data.external_ids.imdb_id}&apikey=${OMDB_API_KEY}`)
    const omdbData = await omdbResponse.json()
  
    const foundTitle = await Title.findOne({ type, id })
    if(foundTitle === null) return res.json({ ...data, omdb: { ...omdbData }, ...foundTitle?._doc, isRecommended: false })
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
  const foundTitle = await Title.findOne({type, id})

  if(foundTitle === null) {
    await Title.create({ ...req.body, isPlayerWorking: false })
    return res.status(201).json({ success: true, isPlayerWorking: false })
  } else {
    Title.findOne({ type: type, id: id }, async (err, title) => {
      if(!err) title.isPlayerWorking = !title.isPlayerWorking
      await title.save()
      return res.status(201).json({ success: true, isPlayerWorking: title.isPlayerWorking })  
    })
  }
}

export const toggleRecommendedTitle = async (req, res) => {
  const { type, id } = req.body

  let title = await Title.findOneAndUpdate({ type, id }, { img: req.body.img })

  if(title === null) title = await Title.create(req.body)

  let recommended = await RecommendedTitle.findOne({ title: title._id })

  if(recommended !== null) return res.status(400).json({ success: false, message: 'Toto dielo sa už nachádza v doporučených' })

  try {
    recommended = await RecommendedTitle.create({ title: title._id })
    recommended = await recommended.populate('title')

    const foundRecommended = await RecommendedTitle.find().sort({ createdAt: 'descending' })

    if(foundRecommended.length > 16){
      let objects = []
      foundRecommended.splice(16).forEach(element => { objects.push(element._id) })
      await RecommendedTitle.deleteMany({_id: { $in: objects }});
    }

    io.emit('newRecommended', { title: recommended })
    res.status(201).json({ success: true, isRecommended: true })
    
  } catch (error) { res.status(500).json({ success: false, message: 'Niečo sa pokazilo' }) }
}

export const removeRecommendedTitle = async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)
  try {
    await RecommendedTitle.findByIdAndDelete(req.body.id)
    res.status(200).json({ success: true })
  } catch (error) { res.sendStatus(500) }
}

export const getEpisode = async (req, res) => {
  const { id, season, episode } = req.params
  try {
    const response = await fetch(`${TMDB_BASE_API}/tv/${id}/season/${season}/episode/${episode}?api_key=${TMDB_API_KEY}&language=sk-SK&append_to_response=translations`)
    res.status(200).json(await response.json())
  } catch (error) { res.sendStatus(500) }
}

export const rateTitle = async (req, res) => {
  const { id: userId } = req.user
  const { action, type, id } = req.body

  try {
    let title = await Title.findOne({ type, id })
    if(title === null) await Title.create({ type, id })
  
    Title.findOne({ type, id }, (error, doc) => {
      if(error) return res.status(400).json({ success: false, message: error })

      switch(action){ 
        case 'like':
          if(doc.likes.includes(userId)) doc.likes = doc.likes.filter(id => id !== userId)
          else doc.likes.push(userId)

          doc.dislikes = doc.dislikes.filter(id => id !== userId)
          break
        case 'dislike':
          if(doc.dislikes.includes(userId)) doc.dislikes = doc.dislikes.filter(id => id !== userId)
          else doc.dislikes.push(userId)

          doc.likes = doc.likes.filter(id => id !== userId)
          break
        default: 
          return res.status(400).json({ success: false, message: 'Nesprávna akcia' })
      }
      doc.save()

      res.status(200).json({ success: true })
    })
  } catch (error) { res.sendStatus(500) }
}

export const getVideo = async (req, res) => {
  try {
    const data = await fetch(`${TMDB_BASE_API}/${req.params.type}/${req.params.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
    res.status(200).json(await data.json())    
  } catch (error) { res.sendStatus(500) }
}

export const getMostLiked = async (req, res) => {
  try {
    const titles = await Title.find({ 'likes.0': { '$exists': true } }).sort({ 'likes': -1 }).limit(10)
    res.json(titles)
  } catch (error) { res.sendStatus(500) }
}