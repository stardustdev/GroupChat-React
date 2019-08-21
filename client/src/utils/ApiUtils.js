import camelize from 'camelize';
import Cookies from 'js-cookie';
import sprintf from 'sprintf-js';
import * as common from '../constants/CommonConstants';

import {
  LOGIN_URL,
  SIGNUP_URL,
  UPDATEPROFILE_URL,
  CHANGEPASSWORD_URL,
  ACCOUNTLIST_URL,
  GROUPLIST_URL,
  FAVORITE_GROUP_URL,
  ADD_NEWGROUP_URL,
  LOAD_MESSAGE_OFGROUP_URL,
} from '../constants/ApiConstants';

export const post = (url, data) => {
  const oauthToken = Cookies.get(common.COOKIE_PATH);

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'oauthToken': oauthToken
    },
    body: JSON.stringify(data)
  };
  return fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));
}

export const form = (url, formData) => {
  const oauthToken = Cookies.get(common.COOKIE_PATH);

  let options = {
    method: 'POST',
    headers: {
      'oauthToken': oauthToken
    },
    body: formData
  };
  return fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));
}

export const get = (url) => {
  const oauthToken = Cookies.get(common.COOKIE_PATH);

  let options = {
    method: 'GET',
    headers: {
      'oauthToken': oauthToken
    }
  };
  return fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));
}

export const login = (username, password) => {
  return post(LOGIN_URL, { username, password });
};

export const signup = (signupFormData) => {
  return form(SIGNUP_URL, signupFormData);
}

export const updateProfile = (profileFormData) => {
  return form(UPDATEPROFILE_URL, profileFormData);
}

export const changePassword = (oldPwd, newPwd) => {
  return post(CHANGEPASSWORD_URL, { oldPwd, newPwd });
}

export const getAccountList = () => {
  return get(ACCOUNTLIST_URL);
}

export const getGroupList = () => {
  return get(GROUPLIST_URL);
}

export const favoriteGroup = (isFavorite, groupId) => {
  let url = sprintf.vsprintf(FAVORITE_GROUP_URL, [isFavorite, groupId]);
  return get(url);
}

export const addNewGroup = (title) => {
  return post(ADD_NEWGROUP_URL, { title: title });
}

export const loadMessageOfGroup = (groupId) => {
  let url = sprintf.vsprintf(LOAD_MESSAGE_OFGROUP_URL, [groupId]);
  return get(url);
}
