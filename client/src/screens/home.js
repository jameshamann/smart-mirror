import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'
import Calendar from 'react-calendar';
import tz from 'moment-timezone'
import Clock from './clock'




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
      date: new Date(),
      currentUser: 'James'
    };
  }

  componentDidMount() {
    console.log()
    var self = this;
    var dat = this.state.weatherData
    this.setState({
        time: new Date().toLocaleString(),
        date: new Date()
      })
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
    console.log(moment())
    const now = Date.now()
    const dat = moment().format('dddd MMMM Do YYYY')
    const tim = moment().format('h:mm a')
    const timeZone = moment.tz.guess();
    const timeZoneAbbr = moment.tz(timeZone).zoneAbbr()
    console.log(timeZone)
    const {date, weatherTemp, weatherDesc, weatherCity, weatherIcon, weatherSunrise} = this.state;
    const sunrise = moment(this.state.weatherSunrise, 'X').format('h:mm a')
    const sunset = moment(this.state.weatherSunset, 'X').format('h:mm a')
    console.log(this.formatDate(this.state.date, 'dd'))

    return (
    <div className="container">

      <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
          {dat}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
          </span>
        </Card.Meta>
        <Card.Description>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
        <Icon name="clock" /> {tim} {timeZoneAbbr}
        </Card.Header>
        <Card.Meta>
          <span className='date'>

          </span>
        </Card.Meta>
        <Card.Description>
        <br />
          <Clock />
        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
        {this.state.weatherCity} {this.state.weatherTemp}°C <br />
        <Image src={"http://openweathermap.org/img/w/" + this.state.weatherIcon + ".png"} /> <br />
        {this.toTitleCase(this.state.weatherDesc)}

        </Card.Header>
        <Card.Meta>
          <span className='date'>
          </span>
        </Card.Meta>
        <Card.Description style={{color: 'white'}}>
        <br />
          <Icon name="sun" /> {sunrise}
          <br />
          <Icon name="moon" />
          {sunset}
        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
        {this.userGreeting(this.state.date.getHours())}, {this.state.currentUser}
          <p>Have a Great Day!</p>
        </Card.Header>
        <Card.Meta>
          <span className='date'>
          </span>
        </Card.Meta>
        <Card.Description style={{color: 'white'}}>
        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>

    );
  }
}

export default Home;
