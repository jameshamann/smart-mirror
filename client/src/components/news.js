import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'


class News extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

 getNews(){
    var self = this;
    fetch('/news')
    .then(function(res){
      return res.json()
    }).then(function(json){
      self.setState({
        headline0: json[0].title,
        headline1: json[1].title,
        headline2: json[2].title,
        headline3: json[3].title,
        headline4: json[4].title
      })
    })
  }

toTitleCase(str)
    {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

  render() {
    return (
        <Header style={{color: 'white', fontFamily: 'Roboto', visibility: this.state.showNews}}>

        </Header>
    );
  }
}

export default News;
