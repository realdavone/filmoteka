import usePagination from '../middleware/pagination.js'

import { createComment, getComment, getComments as getCommentsFromDB, removeComment } from '../features/db/comment.js'

export const getComments = async (req, res) => {
  const { type, id } = req.params
  const page = Number(req.query.page) || 1

  try {
    const comments = await getCommentsFromDB(type, id)

    const { results, numberOfPages, totalResult } = usePagination({
      data: comments,
      currentPage: page,
      perPage: 5
    })

    res.status(200).json({
      comments: results,
      all_comments: totalResult,
      page,
      number_of_pages: numberOfPages
    })
  } catch (error) { res.sendStatus(500) }
}

export const addComment = async (req, res) => {
  const { type, id, content } = req.body
  const { id: userId } = req.user

  try {
    await createComment({ type, id, content, author: userId })
    res.status(201).json({ success: true, message: 'Komentár bol pridaný' })
  } catch (error) { res.sendStatus(500) }
}

export const deleteComment = async (req, res) => {
  const { id } = req.body
  const { id: userId } = req.user

  try {
    const comment = await getComment(id)

    if(comment === null)
      return res.status(404).json({ success: false, message: 'Komentár neexistuje' })

    if(comment.author.toString() !== userId)
      return res.status(403).json({ success: false, message: 'Môžete mazať len svoje komentáre' })

    await removeComment(id)

    res.status(200).json({ success: true })
  } catch (error) { res.sendStatus(500) }
}