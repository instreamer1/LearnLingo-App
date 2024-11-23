export const startSession = (user) => {
  try {
    sessionStorage.setItem("uid", user.uid);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("accessToken", user.accessToken);
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

export const getSession = () => {
  return {
    uid: sessionStorage.getItem("uid"),
    email: sessionStorage.getItem("email"),
    accessToken: sessionStorage.getItem("accessToken"),
  };
};

export const endSession = () => {
  try {
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing session:", error);
  }
};

export const isLoggedIn = () => {
  const session = getSession();
  return !!session.accessToken;
};