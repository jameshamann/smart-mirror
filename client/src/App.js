import React, { Component } from 'react';
import logo from './logo.svg';
import { Container } from 'semantic-ui-react'
import './App.css';
import Home from './screens/home.js'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';



class App extends Component {

  render() {
    return (
      <Container style={{'height': '100%'}}>
        <Home />
      </Container>
    );
  }
}


export default App;
