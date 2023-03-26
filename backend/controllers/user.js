import { getAllUsers, getUser, removeUser, toggleAdminRole, toggleVerifiedStatus } from '../services/db/user.js'

export const getAll = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ success: true, users })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const toggleAdmin = async (req, res) => {
  try {
    const user = await getUser({ _id: req.body.id })
    if(user.isOwner)
      return res.status(400).json({ success: false, message: 'Nemožno meniť práva vlastníka' })

    await toggleAdminRole(req.body.id)
    res.status(200).json({ success: true, message: 'Práva zmenené' })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const toggleVerified = async (req, res) => {
  try {
    const user = await getUser({ _id: req.body.id })
    if(user.isOwner)
      return res.status(400).json({ success: false, message: 'Nemožno meniť práva vlastníka' })
    
    await toggleVerifiedStatus(req.body.id)
    res.status(200).json({ success: true, message: 'Práva zmenené' })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await getUser({ _id: req.body.id })
    if(user.isOwner)
      return res.status(400).json({ success: false, message: 'Nemožno meniť práva vlastníka' })

    await removeUser(req.body.id)
    res.status(200).json({ success: true, message: 'Užívateľ vymazaný' })
  } catch (error) {
    res.sendStatus(500)
  }
}