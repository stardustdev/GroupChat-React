import * as types from '../constants/ActionTypes';

export const makeToast = (item) => ({
  type: types.NEW_TOAST,
  item,
});

export const dismissToast = (item) => ({
  type: types.DISMISS_TOAST,
  item
});
