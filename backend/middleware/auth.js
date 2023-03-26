import { verifyAccessToken } from '../services/auth/token.js'

const auth = (req, res, next) => {
  if(!req.headers['access-token']) return res.status(401).json({ success: false, message: 'Chýba token' })
  
  try {
    const decoded = verifyAccessToken(req.headers['access-token'])
    req.user = decoded
    next()
  } catch (error) { res.status(401).json({ success: false, message: 'Nesprávny token' }) }
}

export default auth