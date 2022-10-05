import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

import fetch from 'node-fetch'
import { init, io } from './io.js'
import mongoose from 'mongoose'

import Genres from './schemas/Genres.js'
import CountryCodes from './schemas/CountryCodes.js'

import authRoutes from './routes/auth.js'
import titleRoutes from './routes/title.js'
import userRoutes from './routes/user.js'
import configRoutes from './routes/config.js'

const app = express()
dotenv.config()

const server = http.createServer(app)
init(server)

const users = new Map()

io.on('connection', (socket) => { 
  users.set(socket.id, null)
  socket.on('disconnect', () => { users.delete(socket.id) })
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token")
  res.header('Access-Control-Allow-Methods', "GET,POST,HEAD,OPTIONS,PUT,DELETE,PATCH")
  next()
})

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY

mongoose.connect(process.env.DATABASE).then(() => { console.log('DB CONNECTED') })

app.use('/api/title', titleRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/config', configRoutes)

app.get('/api/trending/:timeWindow', async (req, res) => {
  const data = await fetch(`${TMDB_BASE_API}/trending/all/${req.params.timeWindow}?api_key=${TMDB_API_KEY}&language=sk-SK`)
  res.json(await data.json())
})

app.get('/api/popular/:type', async (req, res) => {
  const data = await fetch(`${TMDB_BASE_API}/${req.params.type}/popular?api_key=${TMDB_API_KEY}&language=sk-SK`)
  res.json(await data.json())
})

app.get('/api/episode-info/:id/:season/:episode', async (req, res) => {
  const { id, season, episode } = req.params

  const response = await fetch(`${TMDB_BASE_API}/tv/${id}/season/${season}/episode/${episode}?api_key=${TMDB_API_KEY}&language=sk-SK&append_to_response=translations`)
  res.json(await response.json())
})

app.get('/api/video/:type/:id', async (req, res) => {
  const data = await fetch(`${TMDB_BASE_API}/${req.params.type}/${req.params.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
  res.json(await data.json())
})

app.get('/api/person/:id', async (req, res) => {
  const data = await fetch(`${TMDB_BASE_API}/person/${req.params.id}?api_key=${TMDB_API_KEY}&append_to_response=movie_credits,tv_credits,external_ids,translations,images&language=en-US`)
  res.json(await data.json())
})

app.get('/api/discover/:type', async (req, res) => {
  const { sort, page, genre } = req.query
  const data = await fetch(`${TMDB_BASE_API}/discover/${req.params.type}?api_key=${TMDB_API_KEY}&language=sk-SK&sort_by=${sort}&page=${page}&with_genres=${genre}`)
  res.json(await data.json())
})

app.get('/api/search/:searchType', async (req, res) => {
  const { query, page } = req.query
  const data = await fetch(`${TMDB_BASE_API}/search/${req.params.searchType}?api_key=${TMDB_API_KEY}&language=sk-SK&query=${query}&include_adult=false&page=${page}`)
  res.json(await data.json())
})

app.get('/api/collection/:id', async (req, res) => {
  const data = await fetch(`${TMDB_BASE_API}/collection/${req.params.id}?api_key=${TMDB_API_KEY}&append_to_response=translations&language=sk-SK`)
  res.json(await data.json())
})

app.get('/api/genres/:type', async (req, res) => {
  const genre = await Genres.findOne({ name: req.params.type })
  if(genre !== null) { res.json(genre); return }
  
  const response = await fetch(`${TMDB_BASE_API}/genre/${req.params.type}/list?api_key=${TMDB_API_KEY}&language=sk-SK`)
  const data = await response.json()

  const newGenre = await Genres.create({ name: req.params.type, genres: await data.genres })
  res.json(newGenre)
  return
})

app.get('/api/country-codes/:code', async (req, res) => {
  const countryCode = await CountryCodes.findOne({ code: req.params.code })
  if(countryCode !== null) { res.json(countryCode); return }

  const response = await fetch(`https://flagcdn.com/${req.params.code}/codes.json`)
  const data = await response.json()

  const countryCodes = await CountryCodes.create({ code: req.params.code, codes: data })
  res.json(countryCodes)
  return
})

server.listen(process.env.PORT || 5000, () => { console.log(`Server started at port ${process.env.PORT || 5000}`) })