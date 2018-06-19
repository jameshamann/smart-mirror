import React, { Component } from 'react';
import { Icon, Image, Grid, Header } from 'semantic-ui-react'
import moment from 'moment';
import tz from 'moment-timezone'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
import Amplify from 'aws-amplify';
import News from '../components/news'

class DisplayDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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


onChange = date => this.setState({ date })

formatDate(value, format){
  return moment(value).format(format)
}



  render() {
    const now = new Date()
    const dat = moment().format('dddd, MMMM Do YYYY')
    const tim = moment().format('h:mm a')
    const timeZone = moment.tz.guess();
    const timeZoneAbbr = moment.tz(timeZone).zoneAbbr()
    return (
        <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showDate}}>
          {dat}
        </Header>

    );
  }
}

export default DisplayDate;
