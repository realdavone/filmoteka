import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const auth = (req, res, next) => {
  if(!req.headers['access-token']) { return res.status(401).json({ success: false, message: 'Nesprávne headers' })}
  try {
    const decoded = jwt.verify(req.headers['access-token'], process.env.ACCESS_TOKEN_KEY)
    req.user = decoded
    return next()
  } catch (error) { res.status(401).json({ success: false, message: 'Nesprávny token' }) }
}

export default auth