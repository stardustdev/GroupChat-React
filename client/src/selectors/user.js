export const getUserInfo = state => {
  const userInfo = state.entities.users.filter(user => user.oauthToken == state.session.oauthToken);
  if (userInfo && userInfo.length > 0) return userInfo[0];
  return null;
};
