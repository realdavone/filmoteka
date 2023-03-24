import { getPerson as getPersonData } from "../features/fetch/api.js"

export const getPerson = async (req, res) => {
  try {
    const data = await getPersonData(req.params.id)
    res.json(data)    
  } catch (error) {
    res.sendStatus(500)
  }
}