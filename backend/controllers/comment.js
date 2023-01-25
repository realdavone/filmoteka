import Comment from '../schemas/Comment.js'

export const getComments = async (req, res) => {
  const { type, id } = req.params
  const page = Number(req.query.page) || 1

  const COMMENTS_PER_PAGE = 5

  try {
    const comments = await Comment.find({ type, id }).populate('author', ['_id', 'email']).sort({ 'createdAt': -1 })
    const all_comments = comments.length
    const number_of_pages = Math.ceil(all_comments / COMMENTS_PER_PAGE)

    res.status(200).json({
      comments: comments.slice((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE),
      all_comments,
      page,
      number_of_pages
    })
  } catch (error) { res.status(500).json({ success: false, message: error }) }
}

export const addComment = async (req, res) => {
  const { type, id, content } = req.body
  const { id: userId } = req.user

  try {
    await Comment.create({type, id, content, author: userId})
    res.status(201).json({ success: true, message: 'Komentár bol pridaný' })
  } catch (error) { res.status(500).json({ success: false, message: error }) }
}

export const deleteComment = async (req, res) => {
  const { id } = req.body
  const { id: userId } = req.user

  Comment.findById(id, (err, comment) => {
    if(err) return res.status(500).json({ success: false, message: 'Niečo sa pokazilo' })

    if(!comment) return res.status(404).json({ success: false, message: 'Komentár neexistuje' })

    if(comment.author.toString() !== userId) return res.status(403).json({ success: false, message: 'Môžete mazať len svoje komentáre' })
    
    comment.remove()
    res.status(200).json({ success: true })
  })
}