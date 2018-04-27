import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Card, Icon, Image, Grid, Header, Transition, Divider, Button } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'
import Calendar from 'react-calendar';
import tz from 'moment-timezone'
import Clock from './clock'
import Amplify, { API } from 'aws-amplify';


let apiName = 'smartmirror';
let path = '/mirror';


let time = new Date().toLocaleString();


class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      weatherTemp: '',
      weatherDesc: '',
      weatherCity: '',
      weatherIcon: '',
      weatherSunset: '',
      weatherSunrise: '',
      location: 'London',
      date: new Date(),
      currentUser: 'James',
      fact: "Insert Fact Here",
      headline0 : '',
      headline1: '',
      headline2: '',
      headline3: '',
      headline4: '',
      showWeather: '',
      showDate: '',
      showNews: '',
      showSunset: '',
      showSunrise: '',
      showTime: ''
    };
  }

  lambdaGet(){
    API.get(apiName, path).then(response => {
      console.log(response)
    });
  }

  getNews(){
    var self = this;
    fetch('/news')
    .then(function(res){
      console.log(res)
      return res.json()
    }).then(function(json){
      console.log("HELLO")
      self.setState({
        headline0: json[0].title,
        headline1: json[1].title,
        headline2: json[2].title,
        headline3: json[3].title,
        headline4: json[4].title
      })
    })
  }

  componentDidMount() {
    console.log(this.lambdaGet())
    var self = this;
    var dat = this.state.weatherData
    this.setState({
        time: new Date().toLocaleString(),
        date: new Date(),
        fact: "Insert Fact Here"
      })

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.location + '&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
    .then(function(weather) {
      return weather.json()
      console.log(weather.json())
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
          console.log("Hello")
          console.log(this.state.weatherTemp)
        }, 10000);

    setInterval(() => {
      fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
      .then(function(weather) {
        return weather.json()
        console.log(weather.json())
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

userGreeting(date){
  console.log(date)
  if (date < '12') {
    return "Good Morning"
  }
  else if (date < '17') {
    return "Good Afternoon"
  }
  else {
    return "Good Evening"
  }
}

onChange = date => this.setState({ date })

formatDate(value, format){
  return moment(value).format(format)
}

state = { visible: true }

 toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    var currHeadlines = '';
    const { visible } = this.state
    console.log(this.state.headlines)
    console.log(moment())
    const now = Date.now()
    const dat = moment().format('dddd, MMMM Do YYYY')
    const tim = moment().format('h:mm a')
    const timeZone = moment.tz.guess();
    const timeZoneAbbr = moment.tz(timeZone).zoneAbbr()
    console.log(timeZone)
    const {fact, date, weatherTemp, weatherDesc, weatherCity, weatherIcon, weatherSunrise, headlines} = this.state;
    const sunrise = moment(this.state.weatherSunrise, 'X').format('h:mm a')
    const sunset = moment(this.state.weatherSunset, 'X').format('h:mm a')
    console.log(this.formatDate(this.state.date, 'dd'))
    var currHeadlines = [this.state.headline0, this.state.headline1, this.state.headline2, this.state.headline3, this.state.headline4];

      setInterval(function() {
        var i = 0;
              console.log(i)
              if (i == currHeadlines.length) i = 0;
              document
                .getElementById('news')
                .innerHTML = currHeadlines[i++]
      }, 10000);

    return (

      <Grid columns='equal' style={{padding: '20px'}}>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showDate}}>


          {dat}
        </Header>

        </Grid.Column>

        <Grid.Column>


        </Grid.Column>
        <Grid.Column>
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
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
          <Header style={{color: 'white', visibility: this.state.showTime}}>
            <p style={{fontFamily: 'Roboto'}}> {tim} {timeZoneAbbr}</p>
          </Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
        <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showNews}}>
          <div id="news"></div>
        </Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>


        </Grid.Column>

      </Grid.Row>
    </Grid>

    );
  }
}

export default Home;