const axios = require('axios')
const router = require('express').Router()
module.exports = router

//get weather
//api/weather
router.get('/', (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    return axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`)
    .then(response => res.send({
        time: response.data.daily.data[0].time,
        timezone: response.data.timezone,
        summary: response.data.daily.data[0].summary,
        icon: response.data.daily.data[0].icon,
        precip: response.data.daily.data[0].precipProbability,
        hi: response.data.daily.data[0].temperatureHigh,
        lo: response.data.daily.data[0].temperatureLow}))
    .catch(next)
  })
