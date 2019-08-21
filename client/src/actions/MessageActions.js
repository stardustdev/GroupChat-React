import * as api from '../utils/ApiUtils';
import * as types from '../constants/ActionTypes';
import { getUserInfo } from '../selectors/user';
import { getCurrentGroupId, getCurrentGroup } from '../selectors/group';
import { incomingUser, outgoingUser, onlineUsers } from './SessionActions';

const sendTextSuccess = (message) => ({
  type: types.SEND_MESSAGE_SUCCESS,
  message
});

const receivedText = (message) => ({
  type: types.RECEIVED_MESSAGE,
  message
});

const gotUnreadText = (groupId) => ({
  type: types.GOT_UNREADMESSAGE,
  groupId
});

const handShake = (getState) => {
  setTimeout(() => {
    let uInfo = getUserInfo(getState());
    if (uInfo == null) {
      handShake(getState);
    } else {
      console.log('Handshaking...', uInfo.username);
      window.MSGBRIDGE.send(JSON.stringify({
        type: 'handshake',
        uInfo: uInfo
      }));
    }
  }, 100);
}

export const initSignaling = (wsserver_url) => (dispatch, getState) => {
  window.MSGBRIDGE = new WebSocket(wsserver_url);
  window.MSGBRIDGE.onopen = function (event) {
    console.log(`Connected to message server at ${wsserver_url}`);
    handShake(getState);
  };
  window.MSGBRIDGE.onclose = function (event) {
    console.log(`Disconnected from message server. Reconnecting ...`);
    setTimeout(dispatch(initSignaling(wsserver_url)), 1000);
  };
  window.MSGBRIDGE.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    let uInfo = getUserInfo(getState());
    let groupInfo = getCurrentGroup(getState());
    if (uInfo == null) return;

    switch (msg.type) {
      case "text":
        if (uInfo.username === msg.from.username) {
        } else {
          if (msg.groupId != groupInfo.Id || !window.ACTIVE) {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                var notification = new Notification(groupInfo.title, {
                  body: msg.text,
                  icon: '../../assets/img/avatars/' + msg.from.avatarName
                });
              }
            });
          }
          dispatch(receivedText(msg));
          if (getState().session.groupId != msg.groupId) {
            dispatch(gotUnreadText(msg.groupId));
          }
        }
        break;

      case "file":
        break;

      case "online":
        dispatch(onlineUsers(msg.onlineUsers));
        break;

      case "incoming":
        if (uInfo.username != msg.uInfo.username)
          dispatch(incomingUser(msg.uInfo));
        break;

      case "outgoing":
        dispatch(outgoingUser(msg.uInfo));
        break;
    }
  };
};

export const sendText = (text) => (dispatch, getState) => {
  let groupId = getCurrentGroupId(getState());
  let uInfo = getUserInfo(getState());
  if (uInfo == null || text.length == 0) return;
  var msg = {
    type: "text",
    from: uInfo,
    text: text,
    groupId: groupId,
    date: Date.now()
  };
  window.MSGBRIDGE.send(JSON.stringify(msg));
  dispatch(sendTextSuccess(msg));
};

// TODO - binary node module is required. It can send file with json data through WebSocket
export const sendFile = (file) => (dispatch, getState) => {
  let groupId = getCurrentGroupId(getState());
  let uInfo = getUserInfo(getState());
  if (uInfo == null || !file || file.size == 0) return;
  var msg = {
    type: "file",
    from: uInfo,
    file: file,
    groupId: groupId,
    date: Date.now()
  };
  // window.MSGBRIDGE.send(JSON.stringify(msg));
  // dispatch(sendTextSuccess(msg));
};
