import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
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
    setInterval(() => {
        this.setState({
          time: new Date().toLocaleString()
        })
    }, 1000);

  }


  render() {
    const now = Date.now()
    const dat = moment(now).format();


    return (
    <div className="container">

      <Grid columns='equal'>
      <Grid.Row>
      <Card style={{backgroundColor: 'black'}}>
    <Card.Content>
      <Card.Header style={{color: 'white'}}>
        James Hamann
      </Card.Header>
      <Card.Meta>
        <span className='date'>
        </span>
      </Card.Meta>
      <Card.Description style={{color: 'white'}}>
      {dat}
      </Card.Description>
    </Card.Content>

  </Card>
        <Grid.Column>
        <br />


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
