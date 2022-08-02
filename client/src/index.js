import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartItemsProvider } from "./components/contexts/CartItemsContext";

ReactDOM.render(
  <React.StrictMode>
    <CartItemsProvider>
      <App />
    </CartItemsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
