
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex justify-start fixed top-0 bg-white w-full left-0  h-16 items-center pl-6">
      <Link
        className={`ml-6 hover:text-sky-600 ${
          location.pathname === "/" ? "text-sky-800 font-bold" : ""
        }`}
        to="/"
      >
        <h1>Sistema Electoral MSA</h1>
      </Link>
      <Link
        to="/historial"
        className={`ml-6 hover:text-sky-600 ${
          location.pathname === "/historial" ? "text-sky-800 font-bold" : ""
        }`}
      >
        Historial
      </Link>
    </div>
  );
};

export default Navbar;
