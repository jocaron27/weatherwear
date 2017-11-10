const db = require('../server/db');
const Item = require('../server/db/models/item');
const Weather = require('../server/db/models/weather');
const Suggestion = require('../server/db/models/suggestion');

const items = [{
  id: 1,
  name: 'umbrella',
  type: 'accessory',
  icon: ''
}, {
  id: 2,
  name: 'rainboots',
  type: 'shoes',
  icon: '' 
}, {
  id: 3,
  name: 'raincoat',
  type: 'jacket',
  icon: ''
}, {
  id: 4,
  name: 'sunglasses',
  type: 'accessory',
  icon: ''
}, {
  id: 5,
  name: 'thick coat',
  type: 'jacket',
  icon: ''
}, {
  id: 6,
  name: 'medium coat',
  type: 'jacket',
  icon: ''
}, {
  id: 7,
  name: 'light coat',
  type: 'jacket',
  icon: ''
}, {
  id: 8,
  name: 'sweater',
  type: 'top',
  icon: ''
}, {
  id: 9,
  name: 'long pants',
  type: 'bottom',
  icon: ''
}, {
  id: 10,
  name: 'shorts',
  type: 'bottom',
  icon: ''
}, {
  id: 11,
  name: 'skirt',
  type: 'bottom',
  gender: 'female',
  icon: ''
}, {
  id: 12,
  name: 'gloves',
  type: 'accessory',
  icon: ''
}, {
  id: 13,
  name: 'hat',
  type: 'accessory',
  icon: ''
}, {
  id: 14,
  name: 'tshirt',
  type: 'top',
  icon: ''
}, {
  id: 15,
  name: 'tank',
  type: 'top',
  icon: ''
}, {
  id: 16,
  name: 'flipflops',
  type: 'shoes',
  icon: ''
}, {
  id: 17,
  name: 'dress',
  type: 'top',
  gender: 'female',
  icon: ''
}];


const weathers = [{
  id: 1,
  name: 'rain',
  type: 'Precipitation'
}, {
  id: 2,
  name: 'sun',
  type: 'Cloud Cover',
}, {
  id: 3,
  name: 'coldest',
  type: 'Temperature',
}, {
  id: 4,
  name: 'very cold',
  type: 'Temperature',
}, {
  id: 5,
  name: 'colder',
  type: 'Temperature',
}, {
  id: 6,
  name: 'average',
  type: 'Temperature',
}, {
  id: 7,
  name: 'warm',
  type: 'Temperature',
}, {
  id: 8,
  name: 'warmer',
  type: 'Temperature',
}, {
  id: 9,
  name: 'very warm',
  type: 'Temperature',
}, {
  id: 10,
  name: 'warmest',
  type: 'Temperature',
}]

const suggestions = [{
  weatherId: 1,
  itemId: 1
},
{
  weatherId: 1,
  itemId: 2
}, {
  weatherId: 1,
  itemId: 3
}, {
  weatherId: 2,
  itemId: 4
}, {
  weatherId: 3,
  itemId: 5
}, {
  weatherId: 3,
  itemId: 9
}, {
  weatherId: 3,
  itemId: 12
}, {
  weatherId: 3,
  itemId: 13
}, {
  weatherId: 4,
  itemId: 5
}, {
  weatherId: 4,
  itemId: 9
}, {
  weatherId: 5,
  itemId: 6
}, {
  weatherId: 5,
  itemId: 8
}, {
  weatherId: 5,
  itemId: 9
}, {
  weatherId: 6,
  itemId: 6
}, {
  weatherId: 6,
  itemId: 9
}, {
  weatherId: 7,
  itemId: 7
}, {
  weatherId: 7,
  itemId: 9
}, {
  weatherId: 8,
  itemId: 10
}, {
  weatherId: 8,
  itemId: 11
}, {
  weatherId: 8,
  itemId: 14
}, {
  weatherId: 9,
  itemId: 10
}, {
  weatherId: 9,
  itemId: 11
}, {
  weatherId: 9,
  itemId: 15
}, {
  weatherId: 9,
  itemId: 17
}, {
  weatherId: 10,
  itemId: 10
}, {
  weatherId: 10,
  itemId: 11
}, {
  weatherId: 10,
  itemId: 15
}, {
  weatherId: 10,
  itemId: 16
}, {
  weatherId: 10,
  itemId: 17
}]

const seed = () =>
  Promise.all(items.map(item =>
    Item.create(item))
  )
    .then(() =>
      Promise.all(weathers.map(weather =>
        Weather.create(weather))
      ))
    .then(() =>
      Promise.all(suggestions.map(suggestion => Suggestion.create(suggestion)))
    )

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
