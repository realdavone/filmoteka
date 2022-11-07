import Comment from '../schemas/Comment.js'

export const getComments = async (req, res) => {
  const { type, id } = req.params
  const comments = await Comment.find({ type, id }).populate('author', ['_id', 'email']).sort({ 'createdAt': -1 }).limit(10)

  res.status(200).json(comments)
}

export const addComment = async (req, res) => {
  const { type, id, content } = req.body
  const { id: userId } = req.user

  try {
    await Comment.create({type, id, content, author: userId})
    res.status(201).json({ success: true, message: 'Komentár bol pridaný' })
    
  } catch (error) { res.status(500).json({ success: false, message: error }) }
}

export const deleteComment = (req, res) => {
  
}