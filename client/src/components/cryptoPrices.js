import React, { Component } from 'react';
import { Icon, Image, Grid, Header } from 'semantic-ui-react'
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
      currPrice: ''
    };
  }

  getCurrentPrice(){
    fetch('/crypto')
    .then(function(res) {
      console.log(res)
    })
  }

  componentDidMount() {
    var self = this;
    console.log("MOUNT")
    fetch('/crypto')
    .then(function(res) {
      return res.json()
    })
    .then(function(data){
      self.setState({
        currPrice: data
      })
    })

  }

  render() {
    console.log(this.state.currPrice)
    return (
      <Header style={{color: 'white', fontFamily: 'Roboto'}}>Hello!</Header>
    );
  }
}

export default CryptoPrice;
