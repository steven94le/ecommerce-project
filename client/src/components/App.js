import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Brands from "../Pages/BrandsPage/Brands";
import BrandPage from "../Pages/BrandsPage/BrandPage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import Categories from "../Pages/CategoriesPage/Categories";
import CategoryPage from "../Pages/CategoriesPage/CategoryPage";
import GlobalStyles from "./GlobalStyles";
import Home from "../Pages/HomePage/Home";
import NavBar from "./NavigationBar/NavBar";
import Cart from "../Pages/CartPage/Cart";
import Checkout from "../Pages/CheckoutPage/Checkout";
import AccountPage from "../Pages/AccountPage/AccountPage";
import { useContext } from "react";
import Confirmation from "../Pages/CheckoutPage/Confirmation";
import { GoogleUserContext } from "./Contexts/GoogleUserContext";
import { EmailSignInContext } from "./Contexts/EmailSignInContext";

const App = () => {
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);

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
        <Route exact path="/confirmation">
          <Confirmation />
        </Route>
        <Route exact path="/account">
          {!googleUserData.name && !currentUser.givenName ? (
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
