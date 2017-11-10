const router = require('express').Router()
const {Suggestion} = require('../db/models')
module.exports = router

//get all suggestions
//api/suggestions
router.get('/', (req, res, next) => {
  Suggestion.findAll()
    .then(suggestions => res.json(suggestions))
    .catch(next)
})
