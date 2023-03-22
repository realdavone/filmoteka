import dotenv from 'dotenv'

import User from '../schemas/User.js'
import Token from '../schemas/Token.js'
import GlobalSettings from '../schemas/GlobalSettings.js'

import { getAccessToken, getRefreshToken, verifyRefreshToken } from '../features/auth/token.js'
import { comparePassword, getHashedPassword } from '../features/auth/password.js'
import { verifyGoogleToken } from '../features/auth/google-oauth.js'

dotenv.config()

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if(user === null) return res.status(400).json({ success: false, message: 'Užívateľ s touto emailovou adresou neexistuje' })

    if(!comparePassword(password, user.password)) return res.status(401).json({ success: false, message: 'Nesprávne meno alebo heslo' })

    const accessToken = getAccessToken({
      id: user._id,
      email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified
    })

    const refreshToken = getRefreshToken(user._id)

    await Token.create({ token: refreshToken })

    return res.status(200).json({ 
      success: true,
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      } 
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const register = async (req, res) => {
  const { email, password } = req.body

  if(!password || !email) return res.json({ success: false, message: 'Chýba meno alebo heslo' })

  try {
    const { allowRegistration } = await GlobalSettings.findOne({})
    if(!allowRegistration) return res.status(405).json({ success: false, message: 'Registrácia nie je povolená' }) 

    const existingUser = await User.findOne({ email })
    if(existingUser !== null) return res.status(409).json({ success: false, message: 'Užívateľ s touto emailovou adresou už existuje' }) 
  
    const hashed = await getHashedPassword(password, 10)
    await User.create({ email, password: hashed })
    res.status(200).json({ success: true, message: 'Úspešná registrácia' })

  } catch (error) {
    res.sendStatus(500)
  }
}

export const logout = async (req, res) => {
  const { refreshToken } = req.body
  
  try {
    await Token.findOneAndDelete({ token: refreshToken })
    res.status(202).json({ success: true,  message: 'Úspešné odhlásenie' })

  } catch (error) {
    res.sendStatus(500)
  }
}

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  
  if(!refreshToken) return res.status(400).json({ success: false, message: 'Token nebol nájdeny' })

  try {
    const foundRefreshToken = await Token.findOne({ token: refreshToken })
    if(foundRefreshToken === null) return res.status(400).json({ success: false, message: 'Token neexistuje' })

    try {
      const user = verifyRefreshToken(refreshToken)
  
      const foundUser = await User.findOne({ _id: user.id }, ['email', 'isAdmin', 'isVerified'])
      
      const accessToken = getAccessToken({
        id: foundUser._id,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        isVerified: foundUser.isVerified
      })
  
      res.status(200).json({ success: true, accessToken, user: foundUser })
    } catch (error) {
      return res.status(403).json({ success: false, message: 'Neplatný token' })
    }

  } catch (error) {
    res.sendStatus(500)
  }
}

export const googleAuth = async (req, res) => {
  if(!req.body.token) return res.status(400).json({ success: false, message: 'Chýba token' })

  let email, azp

  try {
    const data = await verifyGoogleToken(req.body.token)
    email = data.email
    azp = data.azp
  } catch (error) {
    return res.status(405).json({ success: false, message: error })
  }

  try {
    if(azp !== process.env.GOOGLE_CLIENT_ID) return res.status(405).json({ success: false, message: 'Neplatný token' })
    let user = await User.findOne({ email })
  
    if(!user){
      const { allowRegistration } = await GlobalSettings.findOne({})
      if(!allowRegistration) return res.status(405).json({ success: false, message: 'Registrovanie nových užívateľov nie je povolené' })
      
      user = await User.create({ email })
    }
    const accessToken = getAccessToken({ id: user._id, email, isAdmin: user.isAdmin })
    const refreshToken = getRefreshToken(user._id)
  
    await Token.create({ token: refreshToken })
  
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    res.sendStatus(500)
  }
}