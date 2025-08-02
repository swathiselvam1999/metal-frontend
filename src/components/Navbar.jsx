import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    `text-md md:text-2xl font-medium px-3 py-1 rounded transition duration-200 ${
      location.pathname === path
        ? "text-amber-600"
        : "text-white hover:text-amber-600"
    }`;

  return (
    <nav className="bg-gray-700 shadow p-4 flex justify-between items-center">
      <h1 className="text-lg md:text-3xl font-semibold text-amber-300">Metal Master</h1>
      <div className="flex gap-2">
        <Link to="/purity" className={linkStyle("/purity")}>
          Purity
        </Link>
        <Link to="/rate" className={linkStyle("/rate")}>
          Rate
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
