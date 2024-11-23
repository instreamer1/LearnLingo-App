export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectUid = (state) => state.user.uid;
export const selectIsLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;