import { createSelector } from 'reselect';
import { getUserInfo } from '../selectors/user';

export const getCurrentGroupId = state => {
  return state.session.groupId;
};

export const getAllGroupList = state => {
  return state.entities.grouplist;
};

export const getFavoriteGroups = createSelector(
  getAllGroupList,
  getUserInfo,
  (groupList, userInfo) => groupList.filter(group => userInfo.favoriteGroupIds.indexOf(group.Id) != -1)
);

export const getNormalGroups = createSelector(
  getAllGroupList,
  getUserInfo,
  (groupList, userInfo) => groupList.filter(group => userInfo.favoriteGroupIds.indexOf(group.Id) == -1)
);

export const getCurrentGroup = createSelector(
  getAllGroupList,
  getFavoriteGroups,
  getNormalGroups,
  getCurrentGroupId,
  (groups, favorites, normal, currentGroupId) => {
    let lastGroup = groups.filter(group => group.Id == currentGroupId);
    if (lastGroup.length == 0) {
      if (favorites.length > 0) lastGroup = favorites[0];
      else if (normal.length > 0) lastGroup = normal[0];
      else lastGroup = null;
    } else {
      lastGroup = lastGroup[0];
    }
    return lastGroup;
  }
);
