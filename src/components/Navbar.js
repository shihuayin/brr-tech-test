import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // navigation link styling
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-bold   text-neutral-700 hover:text-primary hover:bg-primary/10 active:font-extrabold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50   ${
      isActive ? "bg-primary/20 text-primary font-semibold" : ""
    }`;

  return (
    <nav aria-label="Main Navigation" className="bg-white shadow-sm py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* left part, different link */}

        <div className="flex flex-wrap gap-4 sm:gap-6">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/staff" className={linkClass}>
            Staff
          </NavLink>
          <NavLink to="/tickets" className={linkClass}>
            Tickets
          </NavLink>
          <NavLink to="/todo" className={linkClass}>
            To-Do
          </NavLink>
          <NavLink to="/request" className={linkClass}>
            Submit Request
          </NavLink>
        </div>

        {/*right part, email + logout button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
          <span className="text-sm text-neutral-500">{user.email}</span>
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            aria-label="Logout"
            className="px-4 py-2 rounded-lg border border-primary text-sm font-semibold text-primary hover:bg-primary hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
