import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { init, io } from './io.js'
import { set, connect } from 'mongoose'

import authRoutes from './routes/auth.js'
import titleRoutes from './routes/title.js'
import userRoutes from './routes/user.js'
import configRoutes from './routes/config.js'
import personRoutes from './routes/person.js'
import collectionRoutes from './routes/collection.js'
import searchRoutes from './routes/search.js'
import discoverRoutes from './routes/discover.js'
import resourcesRoutes from './routes/resources.js'
import panelRoutes from './routes/panel.js'
import commentsRoutes from './routes/comments.js'

import clients from './clients/index.js'

const app = express()
dotenv.config()

const server = http.createServer(app)
init(server)

// io.on('connection', (socket) => { 
//   clients.addClient(socket.id)
//   socket.on('disconnect', () => clients.removeClient(socket.id))
// })

app.use(express.json())
app.use(cors())

set('strictQuery', false)
connect(process.env.DATABASE)
  .then(() => console.log('DB CONNECTED'))

app.use('/api/title', titleRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/config', configRoutes)
app.use('/api/person', personRoutes)
app.use('/api/collection', collectionRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/discover', discoverRoutes)
app.use('/api/panel', panelRoutes)
app.use('/api/resources', resourcesRoutes)
app.use('/api/comments', commentsRoutes)

server.listen(process.env.PORT ?? 5000, () => console.log(`Server started at port ${process.env.PORT || 5000}`))