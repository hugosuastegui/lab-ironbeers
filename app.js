const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const a = punkAPI.getBeers()
  a.then(beersFromApi => res.render('beers.hbs', {beersFromApi}))
  a.catch(err => console.log(`Error: ${err}`))
})

app.get('/random-beer', (req, res, next) => {
  const b = punkAPI.getRandom()
  b.then(randomBeer => {
    console.log(randomBeer)
    res.render('random-beer.hbs', {randomBeer})
  })
  b.catch(err => console.log(`Error: ${err}`))  
})

app.listen(4000, () => console.log('🏃‍ on port 3000'));
