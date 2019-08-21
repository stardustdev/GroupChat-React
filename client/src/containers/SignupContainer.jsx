import React from 'react';
import { connect } from 'react-redux';

import Signup from '../components/Signup';
import { navigateTo } from '../actions/RouterActions';
import { signup } from '../actions/SessionActions';
import { makeToast } from '../actions/AlertActions';

const SignupContainer = props => <Signup {...props} />;

const mapStateToProps = (state) => {
  return {
  };
};


export default connect(mapStateToProps, {
  navigateTo,
  signup,
  makeToast,
})(SignupContainer);
