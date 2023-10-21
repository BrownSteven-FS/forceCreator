import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { checkIsLoggedIn, logout } = useContext(AuthContext);
  const isLoggedIn = checkIsLoggedIn();
  return (
    <header>
      <h1>
        Force <span className="text-green-700">Creator</span>
      </h1>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/create">New Unit</Link>
            <button onClick={logout} className="logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
