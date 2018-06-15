import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home.js'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
require('dotenv').config()



class App extends Component {

  render() {
    return (
        <Home />
    );
  }
}


export default App;
