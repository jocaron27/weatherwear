import axios from 'axios'
var dateFormat = require('dateformat');

/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'
const GET_SUMMARY = 'GET_SUMMARY'
const GET_ICON = 'GET_ICON'
const GET_PRECIP = 'GET_PRECIP'
const GET_LO = 'GET_LO'
const GET_HI = 'GET_HI'

/**
 * INITIAL STATE
 */
const weather = {
    date: '',
    summary: '',
    icon: '',
    precip: 0,
    lo: 0,
    hi: 0
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

/**
 * THUNK CREATORS
 */
export const newDate = () =>
  dispatch => {
    var now = new Date();
    var formatted = dateFormat(now, 'dddd, mmmm dS, yyyy');
    dispatch(getDate(formatted))
}

export const fetchWeather = (latitude, longitude) =>
  dispatch =>
    axios.get(`/api/weather/?latitude=${latitude}&longitude=${longitude}`)
    .then(res => {
        dispatch(getSummary(res.data.summary))
        dispatch(getIcon(res.data.icon))
        dispatch(getPrecip(res.data.precip))
        dispatch(getLo(res.data.lo))
        dispatch(getHi(res.data.hi))
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
    default:
      return state
  }
}