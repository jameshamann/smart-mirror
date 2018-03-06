import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'



let time = new Date().toLocaleString();


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      weatherTemp: '',
      weatherDesc: '',
      weatherCity: '',
      weatherIcon: ''
    };
  }

  updateWeather(){

  }

  componentDidMount() {
    var self = this;
    var dat = this.state.weatherData
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=e064e1033e86a9347cfcc7da69705933&units=metric')
    .then(function(weather) {
      return weather.json()
      console.log(weather.json())
    }).then(function(weather) {
      self.setState({
          weatherTemp: weather.main.temp,
          weatherDesc: weather.weather[0].description,
          weatherCity: weather.name,
          weatherIcon: weather.weather[0].icon
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
            weatherIcon: weather.weather[0].icon
          })
      })
      this.setState({
          time: new Date().toLocaleString()
        })
    }, 30000);
  }


toTitleCase(str)
    {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

userGreeting(time){
  console.log(time)
  if (time < '12:00') {
    return "Good Morning"
  }
  else if (time < '17:00') {
    return "Good Afternoon"
  }
  else {
    return "Good Evening"
  }
}

  render() {
    const now = Date.now()
    const dat = moment().format('MMMM Do YYYY, h:mm a')
    const {weatherTemp, weatherDesc, weatherCity, weatherIcon} = this.state;
    console.log(this.userGreeting(this.state.time))

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
        <Card.Description style={{color: 'white'}}>
        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
        {this.state.weatherCity} {this.state.weatherTemp}°C
        </Card.Header>
        <Card.Meta>
          <span className='date'>
          </span>
        </Card.Meta>
        <Card.Description style={{color: 'white'}}>
          <br />
          {this.toTitleCase(this.state.weatherDesc)}
          <Image src={"http://openweathermap.org/img/w/" + this.state.weatherIcon + ".png"} />

        </Card.Description>
        </Card.Content>

        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card style={{backgroundColor: 'black'}}>
        <Card.Content>
        <Card.Header style={{color: 'white'}}>
          {this.userGreeting(this.state.time)} James,
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
