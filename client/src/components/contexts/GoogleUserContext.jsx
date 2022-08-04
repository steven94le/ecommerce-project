import { createContext, useState } from "react";

export const GoogleUserContext = createContext();
export const GoogleUserContextProvider = ({ children }) => {
  const [googleUserData, setGoogleUserData] = useState({});

  return (
    <GoogleUserContext.Provider
      value={{
        googleUserData,
        setGoogleUserData,
      }}
    >
      {children}
    </GoogleUserContext.Provider>
  );
};
