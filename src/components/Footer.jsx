import { Link } from "react-router-dom";
import { Facebook, Github, Linkedin } from "lucide-react";

export default function Footer() {

  // eslint-disable-next-line no-unused-vars
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Website Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            TravelEase
          </h2>
          <p className="text-sm leading-relaxed">
            TravelEase is a modern vehicle booking platform where users can
            explore, manage, and book vehicles easily and securely.
          </p>
        </div>

        {/* Quick Links */}
        {/* Quick Links */}
        <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>

            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">

                <li>
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-600 transition"
                >
                    Home
                </Link>
                </li>

                <li>
                <Link
                    to="/allVehicles"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-600 transition"
                >
                    All Vehicles
                </Link>
                </li>

                <li>
                <Link
                    to="/addVehicle"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-600 transition"
                >
                    Add Vehicle
                </Link>
                </li>

                <li>
                <Link
                    to="/myVehicle"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-600 transition"
                >
                    My Vehicles
                </Link>
                </li>

                <li>
                <Link
                    to="/myBookings"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-blue-600 transition"
                >
                    My Bookings
                </Link>
                </li>

            </ul>
        </div>


        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4">

            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <Facebook size={20} />
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <Github size={20} />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <Linkedin size={20} />
            </a>

            {/* X logo */}
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition font-bold text-lg">
              X
            </a>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} TravelEase. All rights reserved.
      </div>
    </footer>
  );
}
