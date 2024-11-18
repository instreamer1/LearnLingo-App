export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.loading;
// export const selectUser = (state) => state.user.user;
// export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;