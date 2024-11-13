import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";
import logo from "../../../public/ukraine.svg";
import AuthNav from "../AuthNav/AuthNav";

const Header = () => {
  return (
    <>
      <div className={css.header}>
        <div className={css.container}>
          <div className={css.logoContainer}>
            <img src={logo} alt="" className={css.logo} />
            <a href="/" className={css.nav}>
              LearnLingo
            </a>
            <Navigation />
          </div>
          <AuthNav />
        </div>
      </div>
    </>
  );
};

export default Header;
