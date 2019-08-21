import React from 'react';
import * as CommonUtil from '../utils/CommonUtils';

const Message = (props) => {
  let avatarName = props.message.from.avatarName ? props.message.from.avatarName : 'no_avatar.gif';
  return (
    <li>
      <div className="message-avatar">
        <img src={'../../assets/img/avatars/' + avatarName} className="img-avatar img-avatar-small" alt="kimhj@pic.co.kp"></img>
      </div>
      <div className="message-wrapper">
        <div className="message-header">
          <a className="username">{props.message.from.username}</a>
          <span className="time">{CommonUtil.dateTimeFromTS(props.message.date)}</span>
        </div>
        <div className="message-text">
          {props.message.text}
        </div>
      </div>
    </li>
  );
}

export default Message;