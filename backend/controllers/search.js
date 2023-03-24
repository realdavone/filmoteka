import { fetchSearchResultsFromTMDB } from '../features/fetch/api.js'

export const search = async (req, res) => {
  const { query, page } = req.query
  try {
    fetchSearchResultsFromTMDB
    const data = await fetchSearchResultsFromTMDB({ type: req.params.searchType, query, page })
    res.status(200).json(data)
  } catch (error) {
    res.sendStatus(500) 
  }
}