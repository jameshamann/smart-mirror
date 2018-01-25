import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Grid } from 'semantic-ui-react'

let time = new Date().toLocaleString();


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {
    setInterval(() => {
        this.setState({
          time: new Date().toLocaleString()
        })
    }, 1000);

  }


  render() {
    return (
    <div className="container">

      <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        <br />
          <AnalogClock theme={Themes.dark} gmtOffset={'+1'} />
          <p className="App-intro" style={{color: 'white'}}>{this.state.time}</p>

        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <br />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>

    );
  }
}

export default Home;
