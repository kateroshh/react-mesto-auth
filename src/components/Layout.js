import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ userData }) => {
  return (
    <>
      <Header userData={userData} />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
