import css from "./AuthNav.module.css";
import LogInModal from "../LogInModal/LogInModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { useState } from "react";
import LogOut from "../LogOut/LogOut";
import { selectIsLoggedIn } from "../../redux/authFireBase/selectors";
import { useSelector } from "react-redux";

const AuthNav = () => {
  const [logInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const [registrationModalIsOpen, setRegistrationModalIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
    {isLoggedIn ? (
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

