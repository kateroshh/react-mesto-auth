import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ userData, onExit }) => {
  return (
    <>
      <Header userData={userData} onExit={onExit} />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
