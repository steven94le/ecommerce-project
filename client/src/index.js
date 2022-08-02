import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ItemsContextProvider } from "./components/contexts/ItemsContext";

ReactDOM.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <App />
    </ItemsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
