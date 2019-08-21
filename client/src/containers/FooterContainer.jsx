import React from 'react';
import { connect } from 'react-redux';

import Footer from '../components/Footer';

const FooterContainer = props => <Footer {...props} />;

const mapStateToProps = (state) => {
  return {
  };
};


export default connect(mapStateToProps, {
})(FooterContainer);
