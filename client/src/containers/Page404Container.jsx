import React from 'react';
import { connect } from 'react-redux';

import Page404 from '../components/Page404';
import { navigateTo } from '../actions/RouterActions';

const Page404Container = props => <Page404 {...props} />;

const mapStateToProps = (state) => {
  return {
  };
};


export default connect(mapStateToProps, {
  navigateTo,
})(Page404Container);
