import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/Contexts/CartItemsContext";
import { ItemsContextProvider } from "./components/Contexts/ItemsContext";
import { GoogleUserContextProvider } from "./components/Contexts/GoogleUserContext";
import { FormsProvider } from "./components/Contexts/FormsContext";
import { EmailSignInContextProvider } from "./components/Contexts/EmailSignInContext";

ReactDOM.render(
  <React.StrictMode>
    <EmailSignInContextProvider>
      <GoogleUserContextProvider>
        <FormsProvider>
          <ItemsContextProvider>
            <CartItemsProvider>
              <App />
            </CartItemsProvider>
          </ItemsContextProvider>
        </FormsProvider>
      </GoogleUserContextProvider>
    </EmailSignInContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
