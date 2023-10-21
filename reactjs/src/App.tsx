import { ReactNode, useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import Header from "./components/Header";
import {
  HomePage,
  NotFoundPage,
  CreateUnitPage,
  EditUnitPage,
  ViewUnitPage,
  LoginPage,
  RegisterPage,
} from "./pages";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const { checkIsLoggedIn } = useContext(AuthContext);
  const isLoggedIn = checkIsLoggedIn();
  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
          <Route path="/create" element={<CreateUnitPage />} />
          <Route path="/edit/:id" element={<EditUnitPage />} />
          <Route path="/view/:id" element={<ViewUnitPage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
