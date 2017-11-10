const axios = require('axios')
const router = require('express').Router()
module.exports = router

//get a location
router.get('/', (req, res, next) => {
    const address = req.query.location.replace(/\s*,\s*|\s+|\s,/g, '+')
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOLOCATION_KEY}`)
    .then(response => res.send(response.data.results[0].geometry.location))
    .catch(next)
  })
