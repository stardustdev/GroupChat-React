const API_HOSTNAME = '//192.168.8.101:9001/groupchat-api/';
const API_VERSION = 'v1';

const constructUrl = url => `${API_HOSTNAME}${API_VERSION}${url}`;

export const LOGIN_URL = constructUrl('/login');
export const SIGNUP_URL = constructUrl('/signup');
export const UPDATEPROFILE_URL = constructUrl('/account/update');
export const CHANGEPASSWORD_URL = constructUrl('/account/changepwd');
export const ACCOUNTLIST_URL = constructUrl('/account/list');
export const GROUPLIST_URL = constructUrl('/group/list');
export const FAVORITE_GROUP_URL = constructUrl('/account/favorite/%d/%s');
export const ADD_NEWGROUP_URL = constructUrl('/group');
export const LOAD_MESSAGE_OFGROUP_URL = constructUrl('/group/%s/messages');