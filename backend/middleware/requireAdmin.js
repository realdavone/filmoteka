function requireAdmin(req, res, next) {
  const { isAdmin } = req.user
  if(!isAdmin)
    return res.sendStatus(403).json({ success: false, message: 'Na túto operáciu nemáte dostatočné práva' })
  next()
}

export default requireAdmin