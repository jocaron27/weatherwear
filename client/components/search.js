import React from 'react';
import { connect } from 'react-redux';
import { setLocation, me } from '../store/user';

function Search(props) {
  const {latitude, longitude, handleSubmit} = props;
  console.log(latitude);
  console.log(longitude);
  return (
    <div>
        <form className="form-group" onSubmit={handleSubmit}>
            <input
                className="list-group"
                placeholder="Search Your City (ex: New York, NY)"
                type="text"
                name="location"
            />
            <button type="submit">Search</button>
        </form>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
      longitude: state.user.longitude,
      latitude: state.user.latitude
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    handleSubmit(event) {
        event.preventDefault();
        let search = event.target.location.value;
        dispatch(setLocation(search));
        dispatch(me())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
