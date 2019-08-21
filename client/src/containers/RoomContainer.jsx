import React from 'react';
import { connect } from 'react-redux';

import { getFavoriteGroups, getNormalGroups, getCurrentGroupId } from '../selectors/group';
import {
  setGroupFavorite,
  openGroupAddDlg,
  closeGroupAddDlg,
  addNewGroup,
  loadMessages,
} from '../actions/GroupActions';
import Room from '../components/Room';

const RoomContainer = props => <Room {...props} />;

const mapStateToProps = (state) => {
  let favoriteGroups = getFavoriteGroups(state);
  let normalGroups = getNormalGroups(state);
  let currentGroupId = getCurrentGroupId(state);

  return {
    currentGroupId,
    favoriteGroups,
    normalGroups,
    isGroupAddDlgOpen: state.group.isGroupAddDlgOpen
  };
};


export default connect(mapStateToProps, {
  setGroupFavorite,
  openGroupAddDlg,
  closeGroupAddDlg,
  addNewGroup,
  loadMessages,
})(RoomContainer);
