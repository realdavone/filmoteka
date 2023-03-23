import Title from '../../schemas/Title.js'

export async function getTitleFromDb(type, id) {
  return await Title.findOne({ type, id })
}

export async function handleLikeOrDislike(type, id, action, userId) {
  return await Title.updateOne({ type, id }, {
    ...(action === 'like' ? {
      $push: { likes: userId }, $pull: { dislikes: userId }
    } : {
      $push: { dislikes: userId }, $pull: { likes: userId }
    })
  })
}

export async function handleNonWorkingPlayer(type, id) {
  return await Title.findOneAndUpdate({ type, id }, [
    {
      $set: {
        isPlayerWorking: { $eq: [ false, "$isPlayerWorking" ] }
      }
    }
  ], {
    new: true
  })
}

export async function updateTitle(type, id, data) {
  return await Title.findOneAndUpdate({ type, id }, data)
}

export async function createTitle(args) {
  return await Title.create(args)
}

