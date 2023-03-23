import User from '../../schemas/User.js'

export async function getUser(parameter, options) {
  return await User.findOne(parameter, options)
}

export async function createUser(data) {
  return await User.create(data)
}

export async function removeUser(id) {
  return await User.findOneAndRemove(id)
}

export async function getAllUsers() {
  return await User.find({}, ['email', 'isAdmin', 'isOwner', 'isVerified'])
}

export async function toggleAdminRole(id) {
  return await User.findOneAndUpdate({ _id: id }, [
    {
      $set: {
        isAdmin: { $eq: [ false, "$isAdmin" ] }
      }
    }
  ], {
    new: true
  })
}

export async function toggleVerifiedStatus(id) {
  return await User.findOneAndUpdate({ _id: id }, [
    {
      $set: {
        isVerified: { $eq: [ false, "$isVerified" ] }
      }
    }
  ], {
    new: true
  })
}