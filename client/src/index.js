import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/contexts/CartItemsContext";
import { ItemsContextProvider } from "./components/contexts/ItemsContext";
import { GoogleUserContextProvider } from "./components/contexts/GoogleUserContext";
import { FormsProvider } from "./components/contexts/FormsContext";
import { EmailSignInContextProvider } from "./components/contexts/EmailSignInContext";

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
