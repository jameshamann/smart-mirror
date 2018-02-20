import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home.js'


class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
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
