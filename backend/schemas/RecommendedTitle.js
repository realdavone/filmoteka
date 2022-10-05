import mongoose from 'mongoose'
const { Schema } = mongoose

const recommendedTitleSchema = new Schema({
  title: {
    type: Schema.Types.ObjectId, 
    ref: 'Title',
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    expires: 86400
  }
}, { collection: 'recommendedTitles' })

export default mongoose.model('RecommendedTitle', recommendedTitleSchema)