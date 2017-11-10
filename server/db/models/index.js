const User = require('./user')
const Item = require('./item');
const Weather = require('./weather');
const Suggestion = require('./suggestion');

Item.belongsToMany(Weather, { through: 'suggestion' });
Weather.belongsToMany(Item, { through: 'suggestion' });
//Associations

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User, Item, Weather, Suggestion
}
