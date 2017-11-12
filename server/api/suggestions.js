const router = require('express').Router()
const {Suggestion} = require('../db/models')
module.exports = router

//get suggestions
//api/suggestions/precip/id
router.get('/', (req, res, next) => {
  Suggestion.findAll()
  .then(suggestions => res.json(suggestions))
  .catch(next)
})


router.get('/precip/:id', (req, res, next) => {
  Suggestion.findAll({
    where: {
      weatherId: req.params.id
    }
  })
    .then(suggestions => res.json(suggestions))
    .catch(next)
})

//api/suggestions/cloud/id
router.get('/cloud/:id', (req, res, next) => {
  Suggestion.findAll({
    where: {
      weatherId: req.params.id
    }
  })
    .then(suggestions => res.json(suggestions))
    .catch(next)
})

//api/suggestions/temp/id
router.get('/temp/:id', (req, res, next) => {
  Suggestion.findAll({
    where: {
      weatherId: req.params.id
    }
  })
    .then(suggestions => res.json(suggestions))
    .catch(next)
})
