import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'

/**
 * INITIAL STATE
 */
const allItems = []

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const fetchItems = () =>
  dispatch =>
    axios.get('/api/items')
      .then(res => {
        dispatch(getItems(res.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = allItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
