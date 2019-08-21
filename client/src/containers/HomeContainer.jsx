import React from 'react';
import { connect } from 'react-redux';

import { initAuth } from '../actions/SessionActions';
import { initSignaling } from '../actions/MessageActions';
import Home from '../components/Home';

const HomeContainer = props => <Home {...props} />;

const mapStateToProps = (state) => {
  return {
  };
};


export default connect(mapStateToProps, {
  initAuth,
  initSignaling,
})(HomeContainer);
