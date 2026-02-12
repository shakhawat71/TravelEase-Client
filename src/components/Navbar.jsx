import { NavLink, Link } from "react-router-dom";

export default function Navbar() {

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  const buttonStyle = ({ isActive }) =>
    isActive
      ? "btn btn-sm bg-blue-600 text-white border-none"
      : "btn btn-sm bg-white text-gray-700 border border-gray-300 hover:bg-blue-50";

  return (
    <div className="navbar bg-white shadow-sm px-4">
      
      {/* LEFT SIDE */}
      <div className="navbar-start">

        {/* MOBILE DROPDOWN */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden text-black text-2xl cursor-pointer">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
            <li><NavLink to="/allVehicles" className={navLinkStyle}>All Vehicles</NavLink></li>
            <li><NavLink to="/addVehicle" className={navLinkStyle}>Add Vehicle</NavLink></li>
            <li><NavLink to="/myVehicle" className={navLinkStyle}>My Vehicles</NavLink></li>
            <li><NavLink to="/myBookings" className={navLinkStyle}>My Bookings</NavLink></li>
            <li><NavLink to="/login" className={navLinkStyle}>Login</NavLink></li>
            <li><NavLink to="/register" className={navLinkStyle}>Register</NavLink></li>
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TravelEase
        </Link>
      </div>


      {/* DESKTOP MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
          <li><NavLink to="/allVehicles" className={navLinkStyle}>All Vehicles</NavLink></li>
          <li><NavLink to="/addVehicle" className={navLinkStyle}>Add Vehicle</NavLink></li>
          <li><NavLink to="/myVehicle" className={navLinkStyle}>My Vehicles</NavLink></li>
          <li><NavLink to="/myBookings" className={navLinkStyle}>My Bookings</NavLink></li>
        </ul>
      </div>


      {/* RIGHT SIDE */}
      <div className="navbar-end gap-2">
        <NavLink to="/login" className={buttonStyle}>
          Login
        </NavLink>

        <NavLink to="/register" className={buttonStyle}>
          Register
        </NavLink>
      </div>

    </div>
  );
}
