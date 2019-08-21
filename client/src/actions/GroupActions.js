import Cookies from 'js-cookie';
import * as api from '../utils/ApiUtils';
import * as types from '../constants/ActionTypes';
import * as common from '../constants/CommonConstants';
import { getUserInfo } from '../selectors/user';
import { getCurrentGroup } from '../selectors/group';

const fetchGroupListRequest = () => ({
  type: types.FETCH_GROUPLIST_REQUEST
});

const fetchGroupListSuccess = (groups) => ({
  type: types.FETCH_GROUPLIST_SUCCESS,
  groups
});

const fetchGroupListFailed = () => ({
  type: types.FETCH_GROUPLIST_FAILED
});

const setFavoriteSuccess = (originUInfo, newUInfo) => ({
  type: types.SET_FAVORITEGROUP_SUCCESS,
  originUInfo,
  newUInfo
});

const setFavoriteFailed = () => ({
  type: types.SET_FAVORITEGROUP_FAILED
});

const addNewGroupRequest = () => ({
  type: types.ADD_NEWGROUP_REQUEST
});

const addNewGroupSuccess = (group) => ({
  type: types.ADD_NEWGROUP_SUCCESS,
  group
});

const addNewGroupFailed = () => ({
  type: types.ADD_NEWGROUP_FAILED
});

export const openGroupAddDlg = () => ({
  type: types.ADDING_NEW_GROUP
});

export const closeGroupAddDlg = () => ({
  type: types.CLOSING_NEW_GROUP
});

export const fetchMessageOfGroupRequest = () => ({
  type: types.FETCH_MESSAGE_REQUEST
});

export const fetchMessageOfGroupSuccess = (groupId, messages) => ({
  type: types.FETCH_MESSAGE_SUCCESS,
  groupId,
  messages
});

export const fetchMessageOfGroupFailed = () => ({
  type: types.FETCH_MESSAGE_FAILED
});

export const fetchGroupList = () => async (dispatch, getState) => {
  dispatch(fetchGroupListRequest());

  let { json } = await api.getGroupList();
  if (json.success) {
    dispatch(fetchGroupListSuccess(json.data.groups));

    let lastGroup = getCurrentGroup(getState());
    if (lastGroup != null) {
      dispatch(loadMessages(lastGroup.Id));
    }
  } else {
    dispatch(fetchGroupListFailed());
  }
};

export const setGroupFavorite = (isFavorite, groupId) => async (dispatch, getState) => {
  dispatch(addNewGroupRequest());

  let { json } = await api.favoriteGroup(isFavorite, groupId);

  if (json.success) {
    let origin = getUserInfo(getState());
    dispatch(setFavoriteSuccess(origin, json.data.uInfo));
  } else {
    dispatch(setFavoriteFailed());
  }
};

export const addNewGroup = (title) => async (dispatch) => {
  let { json } = await api.addNewGroup(title);

  if (json.success) {
    dispatch(addNewGroupSuccess(json.data.group));
  } else {
    dispatch(addNewGroupFailed());
  }
};

export const loadMessages = (groupId) => async (dispatch) => {
  dispatch(fetchMessageOfGroupRequest());
  let { json } = await api.loadMessageOfGroup(groupId);

  if (json.success) {
    Cookies.set(common.GROUP_PATH, groupId);
    dispatch(fetchMessageOfGroupSuccess(groupId, json.data.messages));
  } else {
    dispatch(fetchMessageOfGroupFailed());
  }
};
