import axios from 'axios';
var moment = require('moment-timezone');
import {fetchPrecipSuggestions, fetchCloudCoverSuggestions, fetchTempSuggestions} from './suggestion';

/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'
const GET_SUMMARY = 'GET_SUMMARY'
const GET_ICON = 'GET_ICON'
const GET_PRECIP = 'GET_PRECIP'
const GET_LO = 'GET_LO'
const GET_HI = 'GET_HI'
const GET_PRECIP_ID = 'GET_PRECIP_ID'
const GET_CLOUD_ID = 'GET_CLOUD_ID'
const GET_TEMP_ID = 'GET_TEMP_ID'
const SET_DAY = 'SET_DAY'

/**
 * INITIAL STATE
 */
const weather = {
    day: 0,
    date: '',
    summary: '',
    icon: '',
    precip: 0,
    lo: 0,
    hi: 0,
    precipId: 0,
    cloudId: 0,
    tempId: 0
}

/**
 * ACTION CREATORS
 */
const getDate = date => ({type: GET_DATE, date})
const getSummary = summary => ({type: GET_SUMMARY, summary})
const getIcon = icon => ({type: GET_ICON, icon})
const getPrecip = precip => ({type: GET_PRECIP, precip})
const getLo = lo => ({type: GET_LO, lo})
const getHi = hi => ({type: GET_HI, hi})
const getPrecipId = id => ({type: GET_PRECIP_ID, id})
const getCloudId = id => ({type: GET_CLOUD_ID, id})
const getTempId = id => ({type: GET_TEMP_ID, id})
export const setDay = day => ({type: SET_DAY, day})

/**
 * THUNK CREATORS
 */
function weatherIdCreator(weatherData) {
    function setPrecipId(precip) {
        return (precip > 0.3) ? 1 : 0;
    }
    function setCloudId(cloud) {
        return (cloud > 0.3) ? 2 : 0;
    }
    function setTempId(hi, lo) {
        let averageTemp = (hi + lo) / 2
        if (averageTemp < 30) {
            return 3;
        } else if (averageTemp < 40) {
            return 4;
        } else if (averageTemp < 50) {
            return 5;
        } else if (averageTemp < 60) {
            return 6;
        } else if (averageTemp < 70) {
            return 7;
        } else if (averageTemp < 80) {
            return 8;
        } else if (averageTemp < 90) {
            return 9;
        } else if (averageTemp >= 90) {
            return 10;
        }
    }

    return {
        precipId: setPrecipId(weatherData.precip),
        cloudId: setCloudId(weatherData.cloud),
        tempId: setTempId(weatherData.hi, weatherData.lo)
    }
}

export const newDate = (date, tz) =>
  dispatch => {
    var now = moment.tz(date * 1000, tz).format('MMMM Do YYYY');
    dispatch(getDate(now))
}

export const fetchWeather = (latitude, longitude, day) =>
  dispatch =>
    axios.get(`/api/weather/?latitude=${latitude}&longitude=${longitude}&day=${day}`)
    .then(res => {
        let ids = weatherIdCreator(res.data);
        dispatch(newDate(res.data.time, res.data.timezone))
        dispatch(getSummary(res.data.summary))
        dispatch(getIcon(res.data.icon))
        dispatch(getPrecip(res.data.precip))
        dispatch(getLo(res.data.lo))
        dispatch(getHi(res.data.hi))
        dispatch(getPrecipId(ids.precipId))
        dispatch(getCloudId(ids.cloudId))
        dispatch(getTempId(ids.tempId))
        dispatch(fetchPrecipSuggestions(ids.precipId))
        dispatch(fetchCloudCoverSuggestions(ids.cloudId))
        dispatch(fetchTempSuggestions(ids.tempId))
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = weather, action) {
  switch (action.type) {
    case GET_DATE:
      return Object.assign({}, state, {date: action.date})
    case GET_SUMMARY:
        return Object.assign({}, state, {summary: action.summary})
    case GET_ICON:
        return Object.assign({}, state, {icon: action.icon})
    case GET_PRECIP:
        return Object.assign({}, state, {precip: action.precip})
    case GET_LO:
        return Object.assign({}, state, {lo: action.lo})
    case GET_HI:
        return Object.assign({}, state, {hi: action.hi})
    case GET_PRECIP_ID:
        return Object.assign({}, state, {precipId: action.id})
    case GET_CLOUD_ID:
        return Object.assign({}, state, {cloudId: action.id})
    case GET_TEMP_ID:
        return Object.assign({}, state, {tempId: action.id})
    case SET_DAY:
        return Object.assign({}, state, {day: action.day})
    default:
      return state
  }
}