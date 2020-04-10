const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.get('/',  (req, res) => {
  res.render('index', { weather: null, conditionIconUrl: '', error: null })
})
const apiKey = 'dae10b9ea136edea38f673138e3f83a1';

app.post('/', async (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let weatherText, iconUrl, group, id

  const r = await axios.get(url)
  try{
    let body = r.data
    if(body.main == undefined){
      res.render('index', {weather: null, conditionIconUrl: '',  error: 'Error, please try again'});
    } else {
      id = body.weather[0]['id']
      console.log('Current Weather', body.weather[0]['main'])
      weatherText = `It's ${body.main.temp} degrees in ${body.name}!`;
      iconUrl = `http://openweathermap.org/img/wn/${body.weather[0]['icon']}@2x.png`
      return res.render('index', {weather: weatherText, conditionIconUrl: iconUrl,  error: null});
    }
  }catch(err){
    res.render('index', {weather: null, conditionIconUrl: '', error: 'Error, please try again'});
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
