import fetch from 'node-fetch' 

export async function verifyGoogleToken(token) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    return await response.json()    
  } catch (error) {
    throw('Neplatný token')
  }
}