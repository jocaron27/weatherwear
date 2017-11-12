import React from 'react';
import { connect } from 'react-redux';
import { setLocation } from '../store/user';

function Search(props) {
  const {handleSubmit} = props;
  return (
    <div className="search">
        <form className="form-group" onSubmit={handleSubmit}>
            <input
                className="list-group"
                placeholder="Search a new city"
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
