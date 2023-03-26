import { getDiscoverResults } from "../services/fetch/api.js"

export const discover = async (req, res) => {
  const { sort, page, genre } = req.query

  try {
    const data = await getDiscoverResults(req.params.type, sort, page, genre)
    res.status(200).json(data)    
  } catch (error) {
    res.sendStatus(500)
  }
}