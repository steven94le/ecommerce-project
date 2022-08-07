import { createContext, useState } from "react";

export const EmailSignInContext = createContext();
export const EmailSignInContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(false);

  return (
    <EmailSignInContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        error,
        setError,
      }}
    >
      {children}
    </EmailSignInContext.Provider>
  );
};
