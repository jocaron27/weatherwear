import React from 'react';
import { connect } from 'react-redux';

function Weather(props) {
  const {location, date, summary, icon, precip, lo, hi} = props;
  return (
    <div>
        <h1>{location}</h1>
        <h2>{date}</h2>
        <p>{summary}</p>
        <p>{icon}</p>
        <p>{precip * 100}% chance of rain</p>
        <p>Low: {lo}</p>
        <p>High: {hi}</p>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
      location: state.user.location,
      date: state.weather.date,
      summary: state.weather.summary,
      icon: state.weather.icon,
      precip: state.weather.precip,
      lo: state.weather.lo,
      hi: state.weather.hi
  };
};

export default connect(mapStateToProps)(Weather);
