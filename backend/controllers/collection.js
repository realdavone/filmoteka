import { getCollection as collection } from "../features/fetch/api.js"

export const getCollection = async (req, res) => {
  try {
    const data = await collection(req.params.id)
    res.status(200).json(data)    
  } catch (error) {
    res.sendStatus(500)
  }
} 