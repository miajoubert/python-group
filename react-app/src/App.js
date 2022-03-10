import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/user/UsersList";
import User from "./components/user/User";
import Results from "./components/Results";
import AllProducts from "./components/ProductsPage/AllProducts";
import SingleProduct from "./components/ProductsPage/ProductDetail";
import CategoryPage from "./components/CategoryPage";
import { authenticate } from "./store/session";
import { findResults } from "./store/results";
import { refreshCart } from "./store/cart";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  let term = "";
  if (localStorage.search) term = localStorage.search;
  let sameCart = {};
  if (localStorage.cart) sameCart = localStorage.cart;
  // let jsonCart = JSON.parse(`${sameCart}`)("JSON CART", jsonCart);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(findResults(term));
      // await dispatch(refreshCart(jsonCart));
      setLoaded(true);
    })();
  }, [dispatch, term]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/categories/:id" exact={true}>
          <CategoryPage />
        </Route>
        <Route path="/products" exact={true}>
          <AllProducts />
        </Route>
        <Route path="/products/:id" exact={true}>
          <SingleProduct />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/results" exact={true}>
          <Results />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
