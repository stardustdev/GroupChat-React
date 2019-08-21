import * as types from '../constants/ActionTypes';

const initialState = {
  isGroupAddDlgOpen: false,
  isAddNewGroupRequesting: false,
};

export default function group(state = initialState, action) {
  switch (action.type) {
    case types.ADDING_NEW_GROUP:
      return { ...state, isGroupAddDlgOpen: true };

    case types.CLOSING_NEW_GROUP:
      return { ...state, isGroupAddDlgOpen: false };

    case types.ADD_NEWGROUP_REQUEST:
      return { ...state, isAddNewGroupRequesting: true };

    case types.ADD_NEWGROUP_SUCCESS:
      return { ...state, isGroupAddDlgOpen: false, isAddNewGroupRequesting: false };

    case types.ADD_NEWGROUP_FAILED:
      return { ...state, isGroupAddDlgOpen: true, isAddNewGroupRequesting: false };

    default:
      return state;
  }
}
