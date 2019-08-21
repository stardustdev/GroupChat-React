import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';
import { navigateTo } from '../actions/RouterActions';
import { login } from '../actions/SessionActions';

const LoginContainer = props => <Login {...props} />;

const mapStateToProps = (state) => {
  const { router } = state;

  return {
    router
  };
};


export default connect(mapStateToProps, {
  navigateTo,
  login,
})(LoginContainer);
