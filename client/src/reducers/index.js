import { combineReducers } from 'redux';

import router from '../reducers/router';
import session from '../reducers/session';
import entities from '../reducers/entities';
import group from '../reducers/group';
import message from '../reducers/message';
import alerts from '../reducers/alerts';

const rootReducer = combineReducers({
  router,
  session,
  entities,
  group,
  message,
  alerts,
});

export default rootReducer;
