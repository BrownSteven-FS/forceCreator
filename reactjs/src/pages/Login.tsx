import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const LoginPage = () => {
  const { checkIsLoggedIn, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkIsLoggedIn()) navigate("/");
  }, []);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response.ok) navigate("/");
    else setErrors(response.message);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-1/2 sm:px-6 lg:px-8">
        <h2>Login</h2>

        <form className="mt-4 space-y-6 text-sm" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mx-4"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mx-4"
              />
            </div>
          </div>
          {errors && (
            <div>
              <p className="text-red-600">{errors}</p>
            </div>
          )}

          <button type="submit" className="w-full font-semibold">
            Login
          </button>
        </form>
      </div>
      <p className="py-4 text-sm opacity-80">
        Not a member?{" "}
        <Link
          to="/register"
          className="font-semibold text-green-600 hover:text-green-700 hover:opacity-80"
        >
          Register an account
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
