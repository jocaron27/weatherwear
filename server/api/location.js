const axios = require('axios')
const router = require('express').Router()
module.exports = router

//get a location
//api/location
router.get('/', (req, res, next) => {
    const address = req.query.location.replace(/\s*,\s*|\s+|\s,/g, '+')
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOLOCATION_KEY}`)
    .then(response => res.send({
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng,
        location: response.data.results[0].formatted_address}))
    .catch(next)
  })
