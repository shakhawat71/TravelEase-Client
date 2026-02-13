import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer"; // if you have footer

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">

      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
