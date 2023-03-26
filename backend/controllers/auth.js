import { getAccessToken, getRefreshToken, verifyRefreshToken } from '../services/auth/token.js'
import { comparePassword, getHashedPassword } from '../services/auth/password.js'
import { isGoogleAzpValid, verifyGoogleToken } from '../services/auth/google-oauth.js'
import { createUser, getUser } from '../services/db/user.js'
import { createTokenInDB, getTokenFromDB, removeTokenFromDB } from '../services/db/token.js'
import { isRegistrationAllowed } from '../services/db/config.js'

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await getUser({ email })
    if(!user) return res.status(400).json({ success: false, message: 'Užívateľ s touto emailovou adresou neexistuje' })

    if(!comparePassword(password, user.password)) return res.status(401).json({ success: false, message: 'Nesprávne meno alebo heslo' })

    const accessToken = getAccessToken({
      id: user._id,
      email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified
    })

    const refreshToken = getRefreshToken(user._id)

    await createTokenInDB(refreshToken)

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
    if(!await isRegistrationAllowed()) return res.status(405).json({ success: false, message: 'Registrácia nie je povolená' }) 

    const existingUser = await getUser({ email })
    if(existingUser !== null) return res.status(409).json({ success: false, message: 'Užívateľ s touto emailovou adresou už existuje' }) 
  
    const hashed = await getHashedPassword(password, 10)
    await createUser({ email, password: hashed })
    res.status(200).json({ success: true, message: 'Úspešná registrácia' })

  } catch (error) {
    res.sendStatus(500)
  }
}

export const logout = async (req, res) => {
  const { refreshToken } = req.body
  
  try {
    await removeTokenFromDB(refreshToken)
    res.status(202).json({ success: true,  message: 'Úspešné odhlásenie' })

  } catch (error) {
    res.sendStatus(500)
  }
}

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  
  if(!refreshToken) return res.status(400).json({ success: false, message: 'Token nebol nájdeny' })

  try {
    const storedTokenInDB = await getTokenFromDB(refreshToken)
    if(storedTokenInDB === null) return res.status(400).json({ success: false, message: 'Token neexistuje' })

    try {
      const user = verifyRefreshToken(refreshToken)
  
      const foundUser = await getUser({ _id: user.id }, ['email', 'isAdmin', 'isVerified'])
      
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
    if(!isGoogleAzpValid(azp))
      return res.status(405).json({ success: false, message: 'Neplatný token' })
    let user = await getUser({ email })
  
    if(!user){
      if(!await isRegistrationAllowed())
        return res.status(405).json({ success: false, message: 'Registrovanie nových užívateľov nie je povolené' })
      
      user = await createUser({ email })
    }
    const accessToken = getAccessToken({ id: user._id, email, isAdmin: user.isAdmin })
    const refreshToken = getRefreshToken(user._id)
  
    await createTokenInDB(refreshToken)
  
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