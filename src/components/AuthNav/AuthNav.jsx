import css from './AuthNav.module.css';

const AuthNav = () => {
const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ''}`;
};

  return (
    <div>

      <button className={css.logIn} type="button">Log In</button>
      <button className={css.registration} type="button">Registration</button>
    </div>
  );
};
export default AuthNav;