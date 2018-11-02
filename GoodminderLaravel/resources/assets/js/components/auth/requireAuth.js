import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import decode from 'jwt-decode';

export default (ChildComponent, route) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const logged = this.loggedIn();
      if (!logged) {
        this.props.history.push(route);
      }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        // Double exclamation !! coerces object to Boolean. Truthy = true, falsy = false
        let test = !!token && !this.isTokenExpired(token);
        if (test) {
          console.log('requireAuth: logged in')
        } else {
          console.log('requireAuth: logged out')
        }
        return test
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    render () {
      return <ChildComponent {...this.props}/>;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated }
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
};
