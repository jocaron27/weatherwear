// var Skycons = require('react-skycons');
import React from 'react';
import Skycons from 'react-skycons';

export default class Skycon extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      return (
        <Skycons 
          color='#1a4990' 
          icon={this.props.icon} 
          autoplay={true}
        />
      )
    }
  }