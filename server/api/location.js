const axios = require('axios')
const router = require('express').Router()
const { ApiAdapter } = require('./api.utils');
const api = new ApiAdapter(axios);
module.exports = router


//get a location
//api/location
router.get('/', api.getLocation);
