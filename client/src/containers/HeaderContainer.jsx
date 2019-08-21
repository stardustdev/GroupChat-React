import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import { logout } from '../actions/SessionActions';
import { getUserInfo } from '../selectors/user';

import Header from '../components/Header';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = (state) => {
  let uInfo = getUserInfo(state);
  return {
    uInfo,
    onlineUsers: state.session.onlineUsers,
  };
};


export default connect(mapStateToProps, {
  navigateTo,
  logout,
})(HeaderContainer);
