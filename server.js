const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios')
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/weather-app', express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.get('/weather-app',  (req, res) => {
  res.render('index', { weather: null, conditionIconUrl: '', error: null })
})
const apiKey = 'dae10b9ea136edea38f673138e3f83a1';

app.post('/weather-app', async (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let weatherText, iconUrl
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

app.listen(port, () => {
  console.log(`Your server is running on port:${port}`)
});
