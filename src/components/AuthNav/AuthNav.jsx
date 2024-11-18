import css from "./AuthNav.module.css";
import LogInModal from "../LogInModal/LogInModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { useState } from "react";
import LogOut from "../LogOut/LogOut";
import { isLoggedIn } from "../../auth-firebase/session";

const AuthNav = () => {
  const [logInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const [registrationModalIsOpen, setRegistrationModalIsOpen] = useState(false);
  const loggedIn = isLoggedIn();
 


  const openLogInModal = () => {
    setLogInModalIsOpen(true);
  };

  const closeLogInModal = () => {
    setLogInModalIsOpen(false);
  };

  const openRegistrationModal = () => {
    setRegistrationModalIsOpen(true);
  };

  const closeRegistrationModal = () => {
    setRegistrationModalIsOpen(false);
  };

  return (
    <div className={css.authNav}>
      {loggedIn ? (
        <LogOut />
       ) : ( 
        <>
          <button className={css.logIn} type="button" onClick={openLogInModal}>
            Log In
          </button>
          <button
            className={css.registration}
            type="button"
            onClick={openRegistrationModal}
          >
            Registration
          </button>
        </>
       )} 
      <LogInModal modalIsOpen={logInModalIsOpen} closeModal={closeLogInModal} />
      <RegistrationModal
        modalIsOpen={registrationModalIsOpen}
        closeModal={closeRegistrationModal}
      />
    </div>
  );
};

export default AuthNav;
