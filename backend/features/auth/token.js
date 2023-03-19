import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function getAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || "30m" })
}

export function getRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "7d" })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_KEY)
}