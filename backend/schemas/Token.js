import mongoose from 'mongoose'

const { Schema } = mongoose

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    expires: 604800
  }
}, { collection: 'refreshTokens' })

export default mongoose.model('Token', tokenSchema)