import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import weather from './weather'
import suggestions from './suggestion'
import items from './item'

const reducer = combineReducers({user, weather, suggestions, items})
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './weather'
export * from './suggestion'
export * from './item'
