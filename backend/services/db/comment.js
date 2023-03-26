import Comment from "../../schemas/Comment.js"

export async function getComments(type, id) {
  return await Comment.find({ type, id }).populate('author', ['_id', 'email', 'isVerified']).sort({ 'createdAt': -1 })
}

export async function createComment({ type, id, content, author }) {
  return await Comment.create({ type, id, content, author })
}

export async function getComment(id) {
  return await Comment.findById(id)
}

export async function removeComment(id) {
  return await Comment.findByIdAndDelete(id)
}