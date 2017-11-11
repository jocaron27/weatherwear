const axios = require('axios')
const router = require('express').Router()
module.exports = router

//get weather
//api/weather
router.get('/', (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const day = req.query.day || 0;
    return axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`)
    .then(response => res.send({
        time: response.data.daily.data[day].time,
        timezone: response.data.timezone,
        summary: response.data.daily.data[day].summary,
        icon: response.data.daily.data[day].icon,
        precip: response.data.daily.data[day].precipProbability,
        cloud: response.data.daily.data[day].cloudCover,
        hi: response.data.daily.data[day].temperatureHigh,
        lo: response.data.daily.data[day].temperatureLow}))
    .catch(next)
  })
