import { BrowserRouter, Switch, Route } from "react-router-dom";
import Brands from "./brands/Brands";
import BrandPage from "./brands/BrandPage";
import ProductPage from "./ProductPage";

import GlobalStyles from "./GlobalStyles";
import NavBar from "./navigationBar/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavBar />
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/brands">
          <Brands />
        </Route>
        <Route exact path="/brands/:id">
          <BrandPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/category"></Route>
        <Route exact path="/cart"></Route>
        <Route exact path="/confirmation"></Route>
        <Route exact path="/account"></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
