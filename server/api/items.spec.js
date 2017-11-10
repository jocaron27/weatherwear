const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Items route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const name = 'umbrella',
    type = 'accessory',
    icon = ''

    beforeEach(() => {
      return Item.create({
        name, type, icon
      })
    })

    it('GET /api/items', () => {
      return request(app)
        .get('/api/items')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(name)
        })
    })
  }) // end describe('/api/items')
}) // end describe('Item routes')
