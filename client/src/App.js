import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home.js'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';




class App extends Component {
  state = {facts: []}

  componentDidMount() {
    // fetch('/facts')
    //   .then(function(res) {
    //     console.log(res.json())
    //   })

  }


  render() {
    return (
        <Home />
    );
  }
}


export default App;
