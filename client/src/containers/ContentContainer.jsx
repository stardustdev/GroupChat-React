import React from 'react';
import { connect } from 'react-redux';

import Content from '../components/Content';
import { sendText, sendFile } from '../actions/MessageActions';

const ContentContainer = props => <Content {...props} />;

const mapStateToProps = (state) => {
  let messages = state.message.messages;
  let isFetching = state.message.isFetching;
  return {
    messages,
    isFetching
  };
};


export default connect(mapStateToProps, {
  sendText,
  sendFile,
})(ContentContainer);
