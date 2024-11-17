export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;