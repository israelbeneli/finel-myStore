import { createContext, useContext, useState } from "react";

import workerService from "../services/workerservice";

const fn_error_context_must_be_used = () => {
  throw new Error(
    "must use authContext provider for consumer to work properly"
  );
};

export const authContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  createUser: fn_error_context_must_be_used,
  user: null,
});
authContext.displayName = "auth";

export const AuthProvider = ({ children }) => {
  const [worker,setWorker ] = useState(workerService.getWorker());
  const refreshWorker = () => setWorker(workerService.getWorker());
  const login = async (credentials) => {
    const response = await workerService.loginWorker(credentials);
    refreshWorker();
    return response;
  };

  const logout = () => {
    workerService.logout();
    refreshWorker();
  };

  return (
    <authContext.Provider
      value={{ logout, login, worker, createWorker: workerService.createWorker }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
