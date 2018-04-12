import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Card, Icon, Image, Grid, Header } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'
import Calendar from 'react-calendar';
import tz from 'moment-timezone'
import Clock from './clock'
import Button from 'material-ui/Button';



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
      location: 'Horsham',
      date: new Date(),
      currentUser: 'James',
      fact: "Insert Fact Here",
      headlines: []
    };
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
        headlines: [json[0].title, json[1].title, json[2].title, json[3].title, json[4].title]
      })
    })
  }

  componentDidMount() {
    this.getNews()
    var self = this;
    var dat = this.state.weatherData
    this.setState({
        headline: this.getNews(),
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
        }, 100000);

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
    }, 30000);
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

  render() {
    console.log(this.state.headlines)
    console.log(moment())
    const now = Date.now()
    const dat = moment().format('dddd, MMMM Do YYYY')
    const tim = moment().format('h:mm a')
    const timeZone = moment.tz.guess();
    const timeZoneAbbr = moment.tz(timeZone).zoneAbbr()
    console.log(timeZone)
    const {fact, date, weatherTemp, weatherDesc, weatherCity, weatherIcon, weatherSunrise} = this.state;
    const sunrise = moment(this.state.weatherSunrise, 'X').format('h:mm a')
    const sunset = moment(this.state.weatherSunset, 'X').format('h:mm a')
    console.log(this.formatDate(this.state.date, 'dd'))
    return (

      <Grid columns='equal' style={{padding: '20px'}}>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <Header style={{color: 'white', fontFamily: 'Roboto'}}>
          {dat}
        </Header>

        </Grid.Column>
        <Grid.Column>


        </Grid.Column>
        <Grid.Column>
        <Header style={{color: 'white', fontFamily: 'Roboto'}}>
        {this.state.weatherCity} {this.state.weatherTemp}°C <br />
        <Image src={"http://openweathermap.org/img/w/" + this.state.weatherIcon + ".png"} /> <br />
        {this.toTitleCase(this.state.weatherDesc)}

        </Header>
        <br />
          <Icon name="sun" /> {sunrise}
          <br />
          <Icon name="moon" />
          {sunset}
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
          <Header style={{color: 'white'}}>
            <p style={{fontFamily: 'Roboto'}}> {tim} {timeZoneAbbr}</p>
          </Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
        <Header style={{color: 'white', fontFamily: 'Roboto'}}>
        {this.state.headlines.forEach(function(title,index){
          setInterval(() => {
                console.log(title)
            }, 1000);;
          })}
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
