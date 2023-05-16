import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const AuthRouteLogin = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === false ? (
        <Component {...props} />
      ) : (
        <>
          {alert('You must be logged in to visit this page')}
          <Redirect to="/" />
        </>
      )
    }
  />
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

AuthRouteLogin.propTypes = {
  user: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(AuthRouteLogin));
