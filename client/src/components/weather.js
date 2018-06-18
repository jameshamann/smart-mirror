import React, { Component } from 'react';
import { Icon, Image, Grid, Header } from 'semantic-ui-react'
import moment from 'moment';
import tz from 'moment-timezone'

class Weather extends Component {

  constructor(props) {
    super(props);
    this.success = this.success.bind(this)
    this.state = {
      weatherTemp: '',
      weatherDesc: '',
      weatherCity: '',
      weatherIcon: '',
      weatherSunset: '',
      weatherSunrise: '',
      showWeather: '',
      showDate: '',
      showSunset: '',
      showSunrise: '',
      geolang: "51.509865",
      geolong: "-0.118092",
    };
  }

success(pos){
  var self = this;
  this.setState({
    geolang: pos.coords.latitude,
    geolong: pos.coords.longitude
  });
  fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.geolang + '&lon=' + this.state.geolong + '&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
  .then(function(weather) {
    return weather.json()
  }).then(function(weather) {
    self.setState({
        weatherTemp: weather.main.temp,
        weatherDesc: weather.weather[0].description,
        weatherCity: weather.name,
        weatherIcon: weather.weather[0].icon,
        weatherSunrise: weather.sys.sunrise,
        weatherSunset: weather.sys.sunset
      })
  })
}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success)
    var self = this;
    var dat = this.state.weatherData
    this.setState({
        time: new Date().toLocaleString(),
        date: new Date(),
        fact: "Insert Fact Here"
      })
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.geolang + '&lon=' + this.state.geolong + '&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
    .then(function(weather) {
      return weather.json()
    }).then(function(weather) {
      self.setState({
          weatherTemp: weather.main.temp,
          weatherDesc: weather.weather[0].description,
          weatherCity: weather.name,
          weatherIcon: weather.weather[0].icon,
          weatherSunrise: weather.sys.sunrise,
          weatherSunset: weather.sys.sunset
        })
    })
    setInterval(() => {
      fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.geolang + '&lon=' + this.state.geolong + '&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
      .then(function(weather) {
        return weather.json()
      }).then(function(weather) {
        self.setState({
            weatherTemp: weather.main.temp,
            weatherDesc: weather.weather[0].description,
            weatherCity: weather.name,
            weatherIcon: weather.weather[0].icon,
            weatherSunrise: weather.sys.sunrise,
            weatherSunset: weather.sys.sunset
          })
      })
      this.setState({
          time: new Date().toLocaleString(),
          date: new Date()
        })
    }, 100000);
  }


toTitleCase(str)
    {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }


  render() {
    const {weatherTemp, weatherDesc, weatherCity, weatherIcon, weatherSunrise} = this.state;
    const sunrise = moment(this.state.weatherSunrise, 'X').format('h:mm a')
    const sunset = moment(this.state.weatherSunset, 'X').format('h:mm a')
    return (
      <div>


      <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showWeather}}>
        {this.state.weatherCity} {this.state.weatherTemp}°C <br />
        <Image src={"http://openweathermap.org/img/w/" + this.state.weatherIcon + ".png"} /> <br />
        {this.toTitleCase(this.state.weatherDesc)}

      </Header>
        <br />
          <p style={{fontFamily: 'Roboto', color: "white", visibility: this.state.showSunrise}}>
          <Icon name="sun" /> {sunrise}
          <br />
          </p>
          <p style={{fontFamily: 'Roboto', color: "white", visibility: this.state.showSunset}}>
          <Icon name="moon" /> {sunset}
        </p>
      </div>
    );
  }
}

export default Weather;
