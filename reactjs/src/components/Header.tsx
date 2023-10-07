import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        Force <span className="text-green-700">Creator</span>
      </h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">New Unit</Link>
      </nav>
    </header>
  );
};

export default Header;
