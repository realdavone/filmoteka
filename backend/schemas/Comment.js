import mongoose from 'mongoose'
const { Schema } = mongoose

const CommentSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  }
}, { collection: 'comments' });

export default mongoose.model('Comment', CommentSchema);