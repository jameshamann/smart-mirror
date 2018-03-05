import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Grid } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'



let time = new Date().toLocaleString();


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {

  }


  render() {
    const now = Date.now()
    const dat = moment(now).format();


    return (
    <div className="container">

      <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        <br />
        <p style={{color: 'white'}}>{dat}</p>
          <p style={{color: 'white'}}>Hello James Hamann!</p>

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
