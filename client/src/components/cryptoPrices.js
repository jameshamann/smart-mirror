import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import moment from 'moment';
import tz from 'moment-timezone'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
import Amplify from 'aws-amplify';

class CryptoPrice extends Component {

  constructor(props) {
    super(props);
    this.getCurrentPrice = this.getCurrentPrice.bind(this);
    this.state = {
      ethPrice: '',
      btcPrice: '',
      ltcPrice: ''
    };
  }

  getCurrentPrice(){
    var self = this;
    fetch('/crypto')
    .then(function(res) {
      return res.json()
    })
    .then(function(data){
      self.setState({
        ethPrice: data.ETH,
        btcPrice: data.BTC,
        ltcPrice: data.LTC
      })
    })
  }

  componentDidMount() {
    this.getCurrentPrice()
  }

  render() {
    return (
      <p style={{color: 'white', fontFamily: 'Roboto'}}>
      ETH Price: £{this.state.ethPrice.GBP}
      <br />
      BTC Price: £{this.state.btcPrice.GBP}
      <br />
      LTC Price: £{this.state.ltcPrice.GBP}
      </p>
    );
  }
}

export default CryptoPrice;
