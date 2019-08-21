import React from 'react';
import { connect } from 'react-redux';

import { initRouter } from '../actions/RouterActions';
import Root from '../components/Root';
import {
  HomeContainer,
  LoginContainer,
  SignupContainer,
  ProfileContainer,
  ChangePasswordContainer,
} from '../containers';

import {
  INDEX_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  PROFILE_PATH,
  CHANGEPASSWORD_PATH
} from '../constants/RouterConstants';
import { dismissToast } from '../actions/AlertActions';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = (state) => {
  const { router, alerts } = state;

  return {
    paths: [INDEX_PATH, LOGIN_PATH, SIGNUP_PATH, PROFILE_PATH, CHANGEPASSWORD_PATH],
    router,
    routes: {
      [INDEX_PATH]: HomeContainer,
      [LOGIN_PATH]: LoginContainer,
      [SIGNUP_PATH]: SignupContainer,
      [PROFILE_PATH]: ProfileContainer,
      [CHANGEPASSWORD_PATH]: ChangePasswordContainer,
    },
    toasts: alerts.toasts,
  };
};


export default connect(mapStateToProps, {
  initRouter,
  dismissToast,
})(RootContainer);
