/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach('Clear tables', () => db.truncate({cascade: true}))

  describe('Creating new item object', () => {
      let newItem

      beforeEach(() => {
        return Item.create({
            id: 1,
            name: 'umbrella',
            type: 'accessory',
            icon: ''
        })
        .then(item => {
          newItem = item
        })
      })

      it('returns an object', () => {
          expect(newItem).to.be.an('object');
      })
      it('returns an object with name equal to "umbrella"', () => {
        expect(newItem.name).to.equal('umbrella')
      })

  }) // end describe('Creating new item object')
}) // end describe('Item model')
