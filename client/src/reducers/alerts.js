import * as types from '../constants/ActionTypes';

const initialState = {
  toasts: [],
};

export default function alerts(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_ROUTE:
      return { ...initialState };

    case types.NEW_TOAST:
      return { ...state, toasts: [...alerts, action.item] };

    case types.DISMISS_TOAST:
      let index = state.toasts.find(item => item == action.item);
      state.toasts.splice(index, 1);
      return { ...state };

    default:
      return state;
  }
}
