import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
