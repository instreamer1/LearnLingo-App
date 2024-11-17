import css from "./AuthNav.module.css";
import LogInModal from "../LogInModal/LogInModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { useState } from "react";

const AuthNav = () => {
  const [logInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const [registrationModalIsOpen, setRegistrationModalIsOpen] = useState(false);

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
      <button className={css.logIn} type="button" onClick={openLogInModal}>
        Log In
      </button>
      <LogInModal modalIsOpen={logInModalIsOpen} closeModal={closeLogInModal} />
      <button
        className={css.registration}
        type="button"
        onClick={openRegistrationModal}
      >
        Registration
      </button>
      <RegistrationModal
        modalIsOpen={registrationModalIsOpen}
        closeModal={closeRegistrationModal}
      />
    </div>
  );
};

export default AuthNav;

