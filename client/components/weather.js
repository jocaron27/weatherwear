import React from 'react';
import { connect } from 'react-redux';
import Skycon from './skycon';
import {fetchWeather, setDay} from '../store'

function Weather(props) {
  const {location, latitude, longitude, date, summary, icon, precip, lo, hi, handleYesterDay, handleTomorrow, day} = props;
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
        <button
          disabled={(day <= 0)} 
          onClick={() => {
            handleYesterDay(latitude, longitude, day)
          }} >Previous Day</button> 
        <button 
          disabled={(day >= 7)} 
          onClick={() => {
            handleTomorrow(latitude, longitude, day)
          }} >Next Day</button>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
      location: state.user.location,
      longitude: state.user.longitude,
      latitude: state.user.latitude,
      date: state.weather.date,
      summary: state.weather.summary,
      icon: state.weather.icon,
      precip: state.weather.precip,
      lo: state.weather.lo,
      hi: state.weather.hi,
      day: state.weather.day
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
      handleYesterDay (latitude, longitude, day) {
        dispatch(setDay(day - 1))
        dispatch(fetchWeather(latitude, longitude, day - 1))
      },
      handleTomorrow (latitude, longitude, day) {
        dispatch(setDay(day + 1))
        dispatch(fetchWeather(latitude, longitude, day + 1))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
