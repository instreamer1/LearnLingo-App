import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
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
