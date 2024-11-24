import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css"

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Header />
      </header>

      {/* <Suspense fallback={<p>Loading...</p>}>
        {isLoading ? <p>Loading...</p> :  */}
      <main>
        <Outlet />
        {/* } */}
        {/* </Suspense> */}
      </main>
    </>
  );
};

export default Layout;
