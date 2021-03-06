import axios from 'axios'
import history from '../history'
import {fetchWeather, setDay} from './weather'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        dispatch(setDay(0))
        dispatch(fetchWeather(res.data.latitude, res.data.longitude, 0))
      })
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(setDay(0))
        dispatch(fetchWeather(res.data.latitude, res.data.longitude, 0))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const setLocation = (address) =>
dispatch =>
  axios.get(`/api/location/?location=${address}`)
    .then(res => axios.put('/api/users/location', res.data))
    .then(res => {
      dispatch(getUser(res.data))
      dispatch(setDay(0))
      dispatch(fetchWeather(res.data.latitude, res.data.longitude, 0))      
    })
    .then(dispatch(me()))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
