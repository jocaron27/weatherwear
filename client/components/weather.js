import React from 'react';
import { connect } from 'react-redux';
import Skycon from './skycon';

function Weather(props) {
  const {location, date, summary, icon, precip, lo, hi} = props;
  let formattedIcon = icon.replace(/-/g, '_').toUpperCase();


  return (
    <div>
        <h1>{location}</h1>
        <h2>{date}</h2>
        <p>{summary}</p>
        <div style={{maxWidth: '20%'}}>
          <Skycon icon={formattedIcon || "CLOUDY"} />
        </div>
        <p>{Math.round(precip * 100)}% chance of rain</p>
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
