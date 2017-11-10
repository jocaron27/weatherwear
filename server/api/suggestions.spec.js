const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')
const Weather = db.model('weather')
const Suggestion = db.model('suggestion')

describe('Suggestions route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/suggestions/', () => {
    const weatherId = 1,
    itemId = 1

    beforeEach(() => {
      return Item.create({id: 1, name: 'testitem'})
      .then(Weather.create({id: 1, name: 'testweather', type: 'Precipitation'})
        .then(Suggestion.create({
            itemId, weatherId
        }))
      )
    })

    it('GET /api/suggestions', () => {
      return request(app)
        .get('/api/suggestions')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].weatherId).to.be.equal(weatherId)
          expect(res.body[0].itemId).to.be.equal(itemId)
        })
    })
  }) // end describe('/api/suggestions')
}) // end describe('Suggestion routes')
