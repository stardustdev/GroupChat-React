import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import { changePassword } from '../actions/SessionActions';
import ChangePassword from '../components/ChangePassword';
import { makeToast } from '../actions/AlertActions';

const ChangePasswordContainer = props => <ChangePassword {...props} />;

const mapStateToProps = (state) => {
  return {
  };
};


export default connect(mapStateToProps, {
  navigateTo,
  changePassword,
  makeToast,
})(ChangePasswordContainer);
