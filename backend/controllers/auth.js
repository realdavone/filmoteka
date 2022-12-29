import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../schemas/User.js'
import Token from '../schemas/Token.js'
import GlobalSettings from '../schemas/GlobalSettings.js'

dotenv.config()

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if(user === null) return res.status(400).json({ success: false, message: 'Užívateľ s touto emailovou adresou neexistuje' })

    if(user && bcrypt.compareSync(password, user.password)){
      const accessToken = jwt.sign({ id: user._id, email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || "30m" })
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "7d" })

      await Token.create({ token: refreshToken })

      return res.status(200).json({ 
        success: true,
        accessToken,
        refreshToken,
        user: { _id: user._id, email: user.email, isAdmin: user.isAdmin } 
      })
    }
    res.status(401).json({ success: false, message: 'Nesprávne meno alebo heslo' })
  } catch (error) { res.sendStatus(500) }
}

export const register = async (req, res) => {
  const { email, password } = req.body
  if(!password) return res.json({ success: false, message: 'Neboli vyplnené všetky polia' })
  try {
    const { allowRegistration } = await GlobalSettings.findOne({})
    if(!allowRegistration) return res.status(405).json({ success: false, message: 'Registrácia nie je povolená' }) 

    const existingUser = await User.findOne({ email })
    if(existingUser !== null) return res.status(409).json({ success: false, message: 'Užívateľ s touto emailovou adresou už existuje' }) 
  
    const hashed = await bcrypt.hash(password, 10)
    await User.create({ email, password: hashed })
    res.status(200).json({ success: true, message: 'Úspešná registrácia' })
  } catch (error) { res.sendStatus(500) }
}

export const logout = async (req, res) => {
  const { refreshToken } = req.body
  try {
    await Token.findOneAndDelete({ token: refreshToken })
    res.status(202).json({ success: true,  message: 'Úspešné odhlásenie' })
  } catch (error) { res.sendStatus(500) }
}

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  try {
    const foundRefreshToken = await Token.findOne({ token: refreshToken })
    if(foundRefreshToken === null) return res.status(400).json({ success: false, message: 'Token neexistuje' })
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, user) => {
      if(err) return res.status(403).json({success: false, message: 'Neplatný token'})
  
      const foundUser = await User.findOne({_id: user.id}, ['email', 'isAdmin'])
      const accessToken = jwt.sign({ id: foundUser._id, email: foundUser.email, isAdmin: foundUser.isAdmin }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || "30m" })
  
      res.status(200).json({ success: true, accessToken, user: foundUser })
    })
  } catch (error) { res.sendStatus(500) }
}

export const googleAuth = async (req, res) => {
  const { email, azp } = JSON.parse(Buffer.from(req.body.token.split('.')[1], 'base64').toString())

  try {
    if(azp !== process.env.GOOGLE_CLIENT_ID) return res.status(405).json({ success: false, message: 'Neplatný token' })
    let user = await User.findOne({ email })
  
    if(!user){
      const { allowRegistration } = await GlobalSettings.findOne({})
      if(!allowRegistration) return res.status(405).json({ success: false, message: 'Registrovanie nových užívateľov nie je povolené' })
      
      user = await User.create({ email })
    }
    const accessToken = jwt.sign({ id: user._id, email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || "30m" })
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "7d" })
  
    await Token.create({ token: refreshToken })
  
    return res.status(200).json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } })
  } catch (error) { res.sendStatus(500) }
}