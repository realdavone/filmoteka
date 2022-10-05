import mongoose from 'mongoose'
const { Schema } = mongoose

const GenresSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  genres: [
    {
      id: Number,
      name: String
    }
  ]
}, { collection: 'genres' });

export default mongoose.model('Genres', GenresSchema)