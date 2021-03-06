const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/suggestions', require('./suggestions'))
router.use('/location', require('./location'))
router.use('/weather', require('./weather'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
