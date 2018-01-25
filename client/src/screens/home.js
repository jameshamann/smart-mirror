import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Grid } from 'semantic-ui-react'


class Home extends Component {

  componentDidMount() {

  }


  render() {
    return (
    <div className="container">

      <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        <br />
          <AnalogClock theme={Themes.dark} gmtOffset={'+1'} />
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
