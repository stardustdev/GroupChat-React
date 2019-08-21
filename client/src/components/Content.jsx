import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import Message from '../components/Message';
import * as CommonUtil from '../utils/CommonUtils';

const propTypes = {
  sendText: PropTypes.func.isRequired,
  sendFile: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
};


class Content extends Component {
  constructor() {
    super();
    this.onSendText = this.onSendText.bind(this);
    this.onSendFile = this.onSendFile.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    document.querySelector('#input-text').focus();
  }

  componentDidUpdate() {
    document.querySelector('#input-text').focus();
    CommonUtil.scrollToDown(document.querySelector('#message-history'));
  }

  onSendText(e) {
    const { sendText } = this.props;
    let text = document.querySelector('#input-text').value;

    sendText(text);
    document.querySelector('#input-text').value = '';
  }

  onSendFile(e) {
    document.querySelector('#file').click();
  }

  onSelectFile(e) {
    const { sendFile } = this.props;

    let file = e.target.files[0];
    e.target.value = '';
    sendFile(file);
  }

  onKeyUp(e) {
    if (e.keyCode == 13) {
      if (e.ctrlKey) {
        // Input to TextArea to set multiline text
      } else {
        this.onSendText(e);
      }
    }
  }

  render() {
    const { messages, isFetching } = this.props;
    let messageHistory = isFetching ? <div>Loading...</div> :
      messages.map(message => <Message key={message.date} message={message}>{message.text}</Message>);

    return (
      <div>
        <ul className="message-history" id="message-history">
          {messageHistory}
        </ul>
        <Input id="input-text" className="message-input" ref="inputText" onKeyUp={this.onKeyUp} />
        <Button className="message-attach" onClick={this.onSendFile} disabled>
          <i className="fa fa-paperclip"></i>
          <input type="file" hidden id="file" onChange={this.onSelectFile} />
        </Button>
        <Button className="message-send" onClick={this.onSendText}>
          <i className="fa fa-send-o"></i>
          &nbsp;Send
        </Button>
      </div>
    );
  }
}

Content.propTypes = propTypes;

export default Content;