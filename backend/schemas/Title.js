import mongoose from 'mongoose'
const { Schema } = mongoose

const titleSchema = new Schema({
  type: {
    type: String,
    lowercase: true,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  savedTitle: {
    type: String
  },
  img:{
    type: String
  },
  isPlayerWorking: {
    type: Boolean,
    default: true
  },
  likes:{
    type: [String],
    default: []
  },
  dislikes:{
    type: [String],
    default: []
  },
}, { collection: 'titles' });

export default mongoose.model('Title', titleSchema);