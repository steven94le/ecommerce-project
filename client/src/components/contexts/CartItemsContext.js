import React, { useState, createContext } from "react";

export const CartItemsContext = createContext(null);

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
