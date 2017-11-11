import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRECIP_SUGGESTIONS = 'GET_PRECIP_SUGGESTIONS'
const GET_CLOUD_COVER_SUGGESTIONS = 'GET_CLOUD_COVER_SUGGESTIONS'
const GET_TEMP_SUGGESTIONS = 'GET_TEMP_SUGGESTIONS'

/**
 * INITIAL STATE
 */
const suggestions = {
    precip: [],
    cloud: [],
    temp: []
}

/**
 * ACTION CREATORS
 */
const getPrecipSuggestions = items => ({type: GET_PRECIP_SUGGESTIONS, items})
const getCloudCoverSuggestions = items => ({type: GET_CLOUD_COVER_SUGGESTIONS, items})
const getTempSuggestions = items => ({type: GET_TEMP_SUGGESTIONS, items})

/**
 * THUNK CREATORS
 */
export const fetchPrecipSuggestions = (precipId) =>
  dispatch => 
    axios.get(`/api/suggestions/precip/${precipId}`)
    .then(res => dispatch(getPrecipSuggestions(res.data.filter(el => el.weatherId > 0))))
    .catch(err => console.log(err))

export const fetchCloudCoverSuggestions = (cloudId) =>
  dispatch => 
    axios.get(`/api/suggestions/cloud/${cloudId}`)
    .then(res => dispatch(getCloudCoverSuggestions(res.data.filter(el => el.weatherId > 0))))
    .catch(err => console.log(err))

export const fetchTempSuggestions = (tempId) =>
  dispatch => 
    axios.get(`/api/suggestions/temp/${tempId}`)
    .then(res => dispatch(getTempSuggestions(res.data.filter(el => el.weatherId > 0))))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = suggestions, action) {
  switch (action.type) {
    case GET_PRECIP_SUGGESTIONS:
      return Object.assign({}, state, {precip: action.items})
    case GET_CLOUD_COVER_SUGGESTIONS:
        return Object.assign({}, state, {cloud: action.items})
    case GET_TEMP_SUGGESTIONS:
        return Object.assign({}, state, {temp: action.items})
    default:
      return state
  }
}
