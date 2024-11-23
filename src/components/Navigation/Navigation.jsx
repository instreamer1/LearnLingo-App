import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { isLoggedIn } from "../../auth-firebase/session";

const Navigation = () => {

  // const isAuthenticated = isLoggedIn();
  const buildLinkClass = ({ isActive }) => {
    return `${css.link} ${isActive ? css.active : ""}`;
  };
  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/teachers">
        Teachers
      </NavLink>
    {/* { isAuthenticated && <NavLink className={buildLinkClass} to="/favorites">
    Favorites
      </NavLink>} */}
    </nav>
  );
};
export default Navigation;
