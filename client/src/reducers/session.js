import Cookies from 'js-cookie';
import * as common from '../constants/CommonConstants';
import * as types from '../constants/ActionTypes';

const initialState = {
  oauthToken: null,
  groupId: null,
  onlineUsers: [],
};

const session = (state = initialState, action) => {
  let user = null;
  let userIdx = -1;
  let groupId = null;

  switch (action.type) {
    case types.LOGIN_SUCCESS:
      groupId = Cookies.get(common.GROUP_PATH);

      return {
        ...state,
        oauthToken: action.oauthToken,
        groupId: groupId
      };

    case types.LOGOUT:
      return { ...initialState };

    case types.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        groupId: action.groupId
      };

    case types.ONLINE_USERS:
      return { ...state, onlineUsers: action.onlineUsers };

    case types.INCOMING_USER:
      user = state.onlineUsers.find(user => user.username == action.uInfo.username);
      if (user) return { ...state };
      return { ...state, onlineUsers: [...state.onlineUsers, action.uInfo] };

    case types.OUTGOING_USER:
      userIdx = state.onlineUsers.findIndex(user => user.username == action.uInfo.username);
      if (userIdx == -1) return { ...state };
      state.onlineUsers.splice(userIdx, 1);
      return { ...state };

    default:
      return state;
  }
};

export default session;
