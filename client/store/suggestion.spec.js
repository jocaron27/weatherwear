import {expect} from 'chai'
import {fetchPrecipSuggestions} from './suggestion'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {precip: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchPrecipSuggestions', () => {
    it('eventually dispatches the GET_PRECIP_SUGGESTIONS action', () => {
      const fakeSuggestions = [{
        weatherId: 1,
        itemId: 1
      },
      {
        weatherId: 1,
        itemId: 2
      }, {
        weatherId: 1,
        itemId: 3
      }]
      mockAxios.onGet('/api/suggestions/precip/1').replyOnce(200, fakeSuggestions)
      return store.dispatch(fetchPrecipSuggestions(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRECIP_SUGGESTIONS')
          expect(actions[0].items).to.be.deep.equal(fakeSuggestions)
        })
    })
  })
})
