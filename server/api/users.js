const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//get logged in user
//api/users
router.get('/', (req, res, next) => {
  if (req.user) {
    User.findOne({
      where: {
        id: req.user.id
      },
      attributes: ['id', 'email', 'longitude', 'latitude']
    })
      .then(user => res.json(user))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
})

//update a user's location
//api/users/location
router.put('/location', (req, res, next) => {
  if (req.user) {
    User.findById(req.user.id)
      .then(user => user.update({latitude: req.body.lat, longitude: req.body.lng}))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
})
