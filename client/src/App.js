import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home.js'


class App extends Component {
  state = {facts: []}

  componentDidMount() {
    fetch('/facts')
      .then(function(res) {
        console.log(res.json())
      })

  }


  render() {
    return (
      <div className="App" style={{backgroundColor: "black"}}>
        <Home />
         <p className="App-intro" style={{color: 'white'}}>{this.state.response}</p>
      </div>
    );
  }
}


export default App;
