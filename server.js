const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const recentCity = {

  "city1" : {
    name : "",
    link : ""
  }, 
    "city2" : {
    name : "",
    link : ""
  },
    "city3" : {
    name : "",
    link : ""
  }
}



const apiKey = '01eee04ff03866d0f3cf5789d1942a58';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  let weatherText = "Enter a valid city name"
    
  res.render('index', {weather: weatherText, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {

    if(err){

      res.render('index', {weather: null,error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
 
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp}° F in ${weather.name}, ${weather.sys.country} !`;
        
      
        let tz = secondsToHms(weather.timezone);
       // tz = "\n Time Zone is " + tz + ""
       // let addText = '<br><a href="https://en.wikipedia.org/wiki/ ${weather.name}">Check out the city</a>'
        weatherText = weatherText // + tz

        console.log("\n\n************************")
        console.log("City:", weather.name)
        console.log("Timezone:" ,tz)
        console.log("Weather:" ,weather.main.temp)
        console.log("************************")

        res.render('index', {weather: weatherText, error: null});
  
      
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Weather app listening on port 3000!')
})



function secondsToHms(d) {
    d = Number(d);
    var rtr = "UTC"
    if (d<0){
      rtr = "(" + rtr + " - "
      d = -1 * d
    } else if (d > 0) {
      rtr = "(" +  rtr + " + "
    }

   // console.log ("Value of d ", d)

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    m = Number(m)


    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = ""
    if (m > 0){
      mDisplay = m 
    } else if (m == 0 && h > 1) {
      mDisplay = "00"
    } 
    rtr =   rtr + hDisplay + mDisplay ;

    if (d != 0){
      rtr = rtr + ")"
    }

    return rtr; 
}