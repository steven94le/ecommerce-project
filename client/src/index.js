import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/contexts/CartItemsContext";
import { ItemsContextProvider } from "./components/contexts/ItemsContext";
import { GoogleUserContextProvider } from "./components/contexts/GoogleUserContext";
import { FormsProvider } from "./components/contexts/FormsContext";

ReactDOM.render(
  <React.StrictMode>
    <GoogleUserContextProvider>
      <FormsProvider>
        <ItemsContextProvider>
          <CartItemsProvider>
            <App />
          </CartItemsProvider>
        </ItemsContextProvider>
      </FormsProvider>
    </GoogleUserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
