import React, { Component } from 'react';
import { Icon, Image, Grid, Header, Container } from 'semantic-ui-react'
import moment from 'moment';
import tz from 'moment-timezone'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
import Amplify from 'aws-amplify';
import News from '../components/news'
import Time from '../components/time'
import DisplayDate from '../components/date'
import Weather from '../components/weather'
import CryptoPrice from '../components/cryptoPrices.js'

class Home extends Component {

  render() {
      return (
      <Grid columns={3} style={{'padding': "70px", 'height': '100%'}}>

    <Grid.Row verticalAlign="top">
        <Grid.Column>
          <DisplayDate />
          <CryptoPrice />
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Weather />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="bottom">
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Time />
          <br />
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>


        </Grid.Row>
    </Grid>
    );
  }
}

export default Home;
