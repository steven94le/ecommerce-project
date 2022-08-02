import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/contexts/CartItemsContext";
import { ItemsContextProvider } from "./components/contexts/ItemsContext";

ReactDOM.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <CartItemsProvider>
        <App />
      </CartItemsProvider>
    </ItemsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
