import User from '../schemas/User.js'

export const getAll = async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) return res.sendStatus(403)

  try {
    const users = await User.find({}, ['email', 'isAdmin', 'isOwner', 'isVerified'])
    res.status(200).json({ success: true, users })
  } catch (error) { res.sendStatus(500) }
}

export const toggleAdmin = (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)

  User.findById(req.body.id).then(async user => {
    if(user.isOwner) throw('Nemožno meniť práva vlastníka')
    user.isAdmin = !user.isAdmin
    await user.save()

    res.status(200).json({ success: true, message: 'Práva zmenené' })
  })
  .catch(error => res.status(403).json({ success: false, message: error }))
}

export const toggleVerified = (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)

  User.findById(req.body.id).then(async user => {
    user.isVerified = !user.isVerified
    await user.save()

    res.status(200).json({ success: true, message: 'Práva zmenené' })
  })
  .catch(error => res.status(403).json({ success: false, message: error }))
}

export const deleteUser = (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)
  
  User.findById(req.body.id).then(async user => {
    if(user.isOwner) throw('Nemožno zmazať vlastníka')
    await user.remove()
    res.status(200).json({ success: true, message: 'Užívateľ vymazaný' })
  })
  .catch(error => res.status(403).json({ success: false, message: error }))
}