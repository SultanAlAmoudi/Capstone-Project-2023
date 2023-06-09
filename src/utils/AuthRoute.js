import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === false ? (
        <>
          {alert('You must be logged in to visit this page')}
          <Redirect to="/" />
        </>
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(AuthRoute));
