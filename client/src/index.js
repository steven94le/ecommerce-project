import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/contexts/CartItemsContext";
import { ItemsContextProvider } from "./components/contexts/ItemsContext";
import { GoogleUserContextProvider } from "./components/contexts/GoogleUserContext";

ReactDOM.render(
  <React.StrictMode>
    <GoogleUserContextProvider>
      <ItemsContextProvider>
        <CartItemsProvider>
          <App />
        </CartItemsProvider>
      </ItemsContextProvider>
    </GoogleUserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
