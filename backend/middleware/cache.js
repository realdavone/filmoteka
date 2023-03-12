export default function(req, res, next) {
  if(req.method === 'GET') res.set('Cache-control', `public, max-age=${60 * 5}`)
  else res.set('Cache-control', 'no-store')
  next()
}