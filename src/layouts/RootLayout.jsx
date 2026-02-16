import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Add useLocation
import NextGenFooter from "../components/Shared/NextGenFooter";
import NextGenNavbar from "../components/Shared/NextGenNavbar";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <NextGenNavbar />

      <Outlet />

      <NextGenFooter />
    </div>
  );
};

export default RootLayout;
