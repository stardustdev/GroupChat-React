import * as types from '../constants/ActionTypes';

const initialState = {
  messages: [],
  groupId: null,
  isFetching: false
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    case types.RECEIVED_MESSAGE:
      let sameone = state.messages.find(message=>message.from.Id == action.message.from.Id && message.date == action.message.date);
      if (sameone) return { ...state };
      state = { ...state, messages: [...state.messages, action.message] };
      return { ...state };

    case types.FETCH_MESSAGE_REQUEST:
      return {
        ...initialState,
        isFetching: true
      };

    case types.FETCH_MESSAGE_SUCCESS:
      return {
        ...initialState,
        messages: action.messages,
        groupId: action.groupId,
        isFetching: false
      };

    case types.FETCH_MESSAGE_FAILED:
      return {
        ...initialState,
        isFetching: false
      };

    default:
      return state;
  }
};

export default message;
