const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.get('/', require('./read'))
router.post('/rate/', require('./rate'))

// auth middleware (all routes bellow are protected)
router.use((req, res, next) => {
  const token = req.body.token || req.query.token
  if (!token) return res.status(403).send({success: false, message: 'No token.'})
  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (err) return res.json({success: false, message: 'Bad token.'})
    if (!data.user.admin) return res.json({success: false, message: 'Not admin.'})
    next()
  })
})

router.post('/create/', require('./create'))
router.post('/update/', require('./update'))
router.delete('/delete/', require('./delete'))

module.exports = router