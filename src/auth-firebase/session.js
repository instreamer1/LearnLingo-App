export const startSession = (user) => {
  sessionStorage.setItem("uid", user.uid);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("accessToken", user.accessToken);
  };
  
  export const getSession = () => {
    return {
      uid: sessionStorage.getItem("uid"),
      email: sessionStorage.getItem("email"),
      accessToken: sessionStorage.getItem("accessToken"),
    };
  };
  
  export const endSession = () => {
    sessionStorage.removeItem("uid"),
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("accessToken");
  };
  
  export const isLoggedIn = () => {
    return !!getSession().accessToken;
  };
  