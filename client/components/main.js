import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Weather from './weather'
import Suggestions from './suggestions'
import UserHome from './user-home'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div>
        {
          isLoggedIn
            ? <div>
            <nav>
              {/* The navbar will show these links after you log in */}
              <UserHome />
              <a href="#" onClick={handleClick}>Logout</a>
            </nav>
            <h1 className="logo">weather<span className="end">a</span>wear
              <img
                className="suggestions-single-icon"
                src="/umbrella.png"
              />
            </h1>
            <div className="weather-suggestions">
              <Weather />
              <Suggestions />
            </div>
            </div>
            : <div>
            <nav>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </nav>
            <h1 className="logo">weather<span className="end">a</span>wear
              <img
                className="suggestions-single-icon"
                src="/umbrella.png"
              />
            </h1>
            </div>
        }
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
