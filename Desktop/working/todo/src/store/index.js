export const state = () => ({
  userUid: null,
});

export const mutations = {
  loginState(state, userUid) {
    state.userUid = userUid;
  },
  logoutState(state) {
    state.userUid = null;
  },
};
