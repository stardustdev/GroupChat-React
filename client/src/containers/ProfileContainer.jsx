import React from 'react';
import { connect } from 'react-redux';

import Profile from '../components/Profile';
import { navigateTo } from '../actions/RouterActions';
import { updateProfile } from '../actions/SessionActions';
import { makeToast } from '../actions/AlertActions';
import { getUserInfo } from '../selectors/user';

const ProfileContainer = props => <Profile {...props} />;

const mapStateToProps = (state) => {
  let profile = getUserInfo(state);
  if (!profile) profile = { username: '', email: '', avatarName: 'no_avatar.gif' };
  return {
    profile
  };
};


export default connect(mapStateToProps, {
  navigateTo,
  updateProfile,
  makeToast,
})(ProfileContainer);
