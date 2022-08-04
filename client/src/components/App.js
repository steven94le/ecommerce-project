import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Brands from "./brands/Brands";
import BrandPage from "./brands/BrandPage";
import ProductPage from "./ProductPage";
import Categories from "./Categories/Categories";
import CategoryPage from "./Categories/CategoryPage";
import GlobalStyles from "./GlobalStyles";
import Home from "./homepage/Home";
import NavBar from "./navigationBar/NavBar";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import AccountPage from "./accountpage/AccountPage";
import { useContext } from "react";
import { GoogleUserContext } from "./contexts/GoogleUserContext";

const App = () => {
  const { googleUserData } = useContext(GoogleUserContext);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/brands">
          <Brands />
        </Route>
        <Route exact path="/brands/:id">
          <BrandPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/category">
          <Categories />
        </Route>
        <Route exact path="/category/:id">
          <CategoryPage />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/confirmation"></Route>
        <Route exact path="/account">
          {!googleUserData.name ? (
            <AccountPage />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
