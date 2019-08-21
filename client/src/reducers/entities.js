import merge from 'lodash.merge';
import * as types from '../constants/ActionTypes';

const initialState = {
  grouplist: [],
  users: [],
};

export default function entities(state = initialState, action) {
  let index = -1;
  let group = null;

  switch (action.type) {
    case types.LOGOUT:
      return { ...initialState };

    case types.GOT_UNREADMESSAGE:
      group = state.grouplist.find(group => group.Id == action.groupId);
      if (group) group.unread += 1;
      return { ...state };

    case types.FETCH_MESSAGE_SUCCESS:
      group = state.grouplist.find(group => group.Id == action.groupId);
      if (group) group.unread = 0;
      return { ...state };

    case types.FETCH_GROUPLIST_SUCCESS:
      return { ...state, grouplist: action.groups.map(group => ({ ...group, unread: 0 })) };

    case types.FETCH_ACCOUNTLIST_SUCCESS:
      return { ...state, users: action.accounts };

    case types.SET_FAVORITEGROUP_SUCCESS:
      index = state.users.indexOf(action.originUInfo);
      state.users.splice(index, 1, action.newUInfo);
      return { ...state };

    case types.ADD_NEWGROUP_SUCCESS:
      return { ...state, grouplist: [...state.grouplist, { ...action.group, unread: 0 }] };

    case types.SAVEPROFILE_SUCCESS:
      index = state.users.findIndex(user => user.Id == action.uInfo.Id);
      if (index != -1)
        state.users.splice(index, 1, action.uInfo);
      return { ...state };

    default:
      return state;
  }
}
