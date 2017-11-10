const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

//get all items
router.get('/', (req, res, next) => {
  Item.findAll()
    .then(items => res.json(items))
    .catch(next)
})
