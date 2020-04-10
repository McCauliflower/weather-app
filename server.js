const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.get('/',  (req, res) => { 
  res.render('index', {weather: null, condition: null, error: null })
})
const apiKey = 'dae10b9ea136edea38f673138e3f83a1';

app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
  axios.get(url)
  .then( r => {
      let body = r.data
      if(body.main == undefined){
        console.log("undefined")
        res.render('index', {weather: null, condition: null,  error: 'Error, please try again'});
      } else {
        console.log("found", body.main)
        condition = body.weather[0]['main'];
        let weatherText = `It's ${body.main.temp} degrees in ${body.name}!`;
        res.render('index', {weather: weatherText, condition,  error: null});
      }
    })
    .catch(err => {
      console.log('caught', err)
      res.render('index', {weather: null, error: 'Error, please try again'});
    })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

// <img src="<%= conditionIconUrl %>" alt="" class="logo">
