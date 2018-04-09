import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home.js'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);



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
