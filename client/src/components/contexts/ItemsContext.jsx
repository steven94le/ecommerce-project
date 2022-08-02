import { createContext, useEffect, useState } from "react";

export const ItemsContext = createContext();
export const ItemsContextProvider = ({ children }) => {
  const [itemsState, setItemsState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get-items");
      const data = await response.json();
      const itemsData = await data.data;
      setItemsState(itemsData);
    };
    fetchData();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        itemsState,
        setItemsState,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
