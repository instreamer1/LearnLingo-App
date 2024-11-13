import css from './AuthNav.module.css';

const AuthNav = () => {


  return (
    <div className={css.authNav} >
      <button className={css.logIn} type="button">Log In</button>
      <button className={css.registration} type="button">Registration</button>
    </div>
  );
};
export default AuthNav;