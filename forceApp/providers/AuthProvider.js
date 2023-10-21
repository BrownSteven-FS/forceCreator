import { useState, useEffect, createContext } from "react";
import { defaultUnitContext } from "./UnitProvider";

export const AuthContext = createContext(defaultUnitContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      const getUser = async () => {
        const user = AuthService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      };
      getUser();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const isLoggedIn = () => {
    return currentUser !== null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
