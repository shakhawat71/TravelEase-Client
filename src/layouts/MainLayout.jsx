// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
