import Token from "../../schemas/Token.js"

export async function removeAllTokensFromDB() {
  return await Token.deleteMany({})
}

export async function removeTokenFromDB(token) {
  return await Token.findOneAndDelete({ token })
}

export async function getTokenFromDB(token) {
  return await Token.findOne({ token })
}

export async function createTokenInDB(token) {
  return await Token.create({ token })
}