import React, { Component } from 'react';
import { Icon, Image, Grid, Header } from 'semantic-ui-react'
import moment from 'moment';
import tz from 'moment-timezone'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
import Amplify from 'aws-amplify';
import News from '../components/news'

class Time extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTime: ''
    };
  }


  componentDidMount() {

    setInterval(() => {
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
    const name = process.env.REACT_APP_NAME
    const { visible } = this.state
    const now = new Date()
    const dat = moment().format('dddd, MMMM Do YYYY')
    const tim = moment().format('h:mm a')
    const timeZone = moment.tz.guess();
    const timeZoneAbbr = moment.tz(timeZone).zoneAbbr()
    return (
      <div>
        <Header style={{color: 'white', visibility: this.state.showTime}}>
          <p style={{fontFamily: 'Roboto'}}> {tim}</p>
        </Header>
        <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showGreeting}}>

          {this.userGreeting(now.getHours())}, {name}

        </Header>
      </div>
    );
  }
}

export default Time;
