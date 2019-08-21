import Cookies from 'js-cookie';
import * as api from '../utils/ApiUtils';
import * as types from '../constants/ActionTypes';
import * as common from '../constants/CommonConstants';
import { navigateTo } from '../actions/RouterActions';
import { fetchGroupList } from '../actions/GroupActions';
import { async } from 'q';
import {
  LOGIN_PATH,
  INDEX_PATH
} from '../constants/RouterConstants';
import { getUserInfo } from '../selectors/user';
import { makeToast } from './AlertActions';

const loginSuccess = (oauthToken) => ({
  type: types.LOGIN_SUCCESS,
  oauthToken,
});

const signupSuccess = uInfo => ({
  type: types.SIGNUP_SUCCESS,
  uInfo,
});

const saveProfileSuccess = uInfo => ({
  type: types.SAVEPROFILE_SUCCESS,
  uInfo,
});

const changePasswordSuccess = uInfo => ({
  type: types.CHANGEPASSWORD_SUCCESS,
  uInfo,
});

const fetchAccountListSuccess = (accounts) => ({
  type: types.FETCH_ACCOUNTLIST_SUCCESS,
  accounts,
});

const fetchAccountList = () => async (dispatch) => {
  const { json } = await api.getAccountList();
  if (json.success) {
    dispatch(fetchAccountListSuccess(json.data.accounts));
    dispatch(fetchGroupList());
  } else {
    // <TODO> failure treatment
  }
}

export const initAuth = () => (dispatch, getState) => {
  const oauthToken = Cookies.get(common.COOKIE_PATH);
  if (oauthToken) {
    if (!getUserInfo(getState())) {
      dispatch(loginSuccess(oauthToken));
      dispatch(fetchAccountList());
    }
  } else {
    if (getState().router.route.path == INDEX_PATH) {
      dispatch(navigateTo({
        keys: {},
        path: LOGIN_PATH,
        options: {},
      }));
    }
  }
}

export const login = (username, password) => async (dispatch) => {
  const { json } = await api.login(username, password);
  if (json.success) {
    const oauthToken = json.data.uInfo.oauthToken;
    Cookies.set(common.COOKIE_PATH, oauthToken);

    dispatch(loginSuccess(oauthToken));
    dispatch(fetchAccountList());
    dispatch(navigateTo({
      keys: {},
      path: INDEX_PATH,
      options: {},
    }));
  } else {
    dispatch(makeToast({ message: 'Login failed.' }));
    dispatch({ type: types.LOGIN_FAILED });
  }
};

export const logout = () => async (dispatch, getState) => {
  Cookies.remove(common.COOKIE_PATH);

  let uInfo = getUserInfo(getState());
  let msg = {
    type: 'logout',
    uInfo
  };
  window.MSGBRIDGE.send(JSON.stringify(msg));

  dispatch({ type: types.LOGOUT });
  dispatch(navigateTo({
    keys: {},
    path: LOGIN_PATH,
    options: {},
  }));
};

export const signup = (signupFormData) => async (dispatch) => {
  const { json } = await api.signup(signupFormData);
  if (json.success) {
    dispatch(signupSuccess(json.data.uInfo));
    dispatch(navigateTo({
      keys: {},
      path: LOGIN_PATH,
      options: {},
    }));
  } else {
    dispatch({ type: types.SIGNUP_FAILED });
  }
};

export const updateProfile = (profileFormData) => async (dispatch) => {
  dispatch({ type: types.SAVEPROFILE_REQUEST });
  const { json } = await api.updateProfile(profileFormData);
  if (json.success) {
    dispatch(saveProfileSuccess(json.data.uInfo));
    dispatch(navigateTo({
      keys: {},
      path: INDEX_PATH,
      options: {},
    }));
  } else {
    dispatch({ type: types.SAVEPROFILE_FAILED });
  }
};

export const changePassword = (oldPwd, newPwd) => async (dispatch) => {
  dispatch({ type: types.CHANGEPASSWORD_REQUEST });
  const { json } = await api.changePassword(oldPwd, newPwd);
  if (json.success) {
    dispatch(changePasswordSuccess(json.data.uInfo));
    dispatch(navigateTo({
      keys: {},
      path: INDEX_PATH,
      options: {},
    }));
  } else {
    dispatch({ type: types.SAVEPROFILE_FAILED });
  }
};

export const incomingUser = (uInfo) => ({
  type: types.INCOMING_USER,
  uInfo
});

export const outgoingUser = (uInfo) => ({
  type: types.OUTGOING_USER,
  uInfo
});

export const onlineUsers = (onlineUsers) => ({
  type: types.ONLINE_USERS,
  onlineUsers
});
