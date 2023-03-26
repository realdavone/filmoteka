import bcrypt from 'bcryptjs'

export function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

export async function getHashedPassword(password, salt) {
  return await bcrypt.hash(password, salt)
}