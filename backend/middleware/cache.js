export default function (period = 60 * 30) {
  return function(req, res, next) {
    if(req.method === 'GET') res.set('Cache-control', `public, max-age=${period}`)
    else res.set('Cache-control', 'no-store')
    next()
  }
}