import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/lambda_home.js'



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
