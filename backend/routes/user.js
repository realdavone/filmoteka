import express from 'express'
import auth from '../middleware/auth.js'

import User from '../schemas/User.js'

const router = express.Router()

router.get('/all', auth, async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)
  try {
    const users = await User.find({}, ['email', 'isAdmin', 'isOwner'])
    res.status(200).json({ success: true, users })
  } catch (error) { res.sendStatus(500) }
})

router.patch('/toggleadmin', auth, async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)
  User.findById(req.body.id)
  .then(async user => {
    if(user.isOwner) throw('Nemožno meniť práva vlastníka')
    user.isAdmin = !user.isAdmin
    await user.save()
    res.status(200).json({ success: true, message: 'Práva zmenené' })
  })
  .catch(error => res.status(403).json({ success: false, message: error }))
})

router.delete('/delete', auth, async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)
  User.findById(req.body.id)
  .then(async user => {
    if(user.isOwner) throw('Nemožno zmazať vlastníka')
    await user.remove()
    res.status(200).json({ success: true, message: 'Užívateľ vymazaný' })
  })
  .catch(error => res.status(403).json({ success: false, message: error }))
})

export default router