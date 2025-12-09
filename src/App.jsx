import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import WishList from "./pages/WishList";
import { Fragment, useEffect, useState } from "react";
import Loading from "./components/Loading";
import ProductDetails from "./pages/ProductDetails";
import { Provider } from "react-redux";
import store from "./reduxToolkit/store/Store";
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(false);
  const Routing = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <>
              <Home />
            </>
          ),
        },
        {
          path: "/shop",
          element: (
            <>
              <Shop />
            </>
          ),
        },
        {
          path: "/shop/:id",
          element: (
            <>
              <ProductDetails />
            </>
          ),
        },
        {
          path: "/about",
          element: (
            <>
              <About />
            </>
          ),
        },
        {
          path: "/contact",
          element: (
            <>
              <Contact />
            </>
          ),
        },
        {
          path: "/login",
          element: (
            <>
              <Login />
            </>
          ),
        },
        {
          path: "/register",
          element: (
            <>
              <Register />
            </>
          ),
        },
        {
          path: "/cart",
          element: (
            <>
              <Cart />
            </>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <>
              <WishList />
            </>
          ),
        },
        {
          path: "/profile",
          element: (
            <>
              <Profile />
            </>
          ),
        },
      ],
    },
  ]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Fragment>
      <Provider store={store}>
        {loading ? <Loading /> : <RouterProvider router={Routing} />}
      </Provider>
    </Fragment>
  );
}

export default App;
