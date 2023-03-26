import RecommendedTitle from '../../schemas/RecommendedTitle.js'
import Title from '../../schemas/Title.js'

export async function getTitleFromDb(type, id) {
  return await Title.findOne({ type, id })
}

export async function handleLikeOrDislike(type, id, action, userId) {
  return new Promise((res, rej) => {
    Title.findOne({ type, id }, async (error, doc) => {
      if(error) rej(error)

      switch(action){ 
        case 'like':
          if(doc.likes.includes(userId)) doc.likes = doc.likes.filter(id => id !== userId)
          else doc.likes.push(userId)

          doc.dislikes = doc.dislikes.filter(id => id !== userId)
          break
        case 'dislike':
          if(doc.dislikes.includes(userId)) doc.dislikes = doc.dislikes.filter(id => id !== userId)
          else doc.dislikes.push(userId)

          doc.likes = doc.likes.filter(id => id !== userId)
          break
      }
      await doc.save()
      res(doc)
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

export async function createRecommendedTitle(id) {
  return await RecommendedTitle.create({ title: id })
}

export async function deleteRecommendedTitle(id) {
  return await RecommendedTitle.findByIdAndDelete(id)
}

export async function getRecommendedTitle(id) {
  return await RecommendedTitle.findOne({ title: id })
}

export async function getRecommendedTitles(options) {
  if(options?.sorted) return await RecommendedTitle.find().populate('title').sort({ createdAt: 'descending' })
  else return await RecommendedTitle.find().populate()
}

export async function removeRecommendedTitles(ids) {
  return await RecommendedTitle.deleteMany({ _id: { $in: ids } })
}

export async function getMostLikedTitles() {
  return await Title.find({ 'likes.0': { '$exists': true } }).sort({ 'likes': -1 }).limit(10)
}