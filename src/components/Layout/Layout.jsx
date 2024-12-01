import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Header />
      </header>

      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
