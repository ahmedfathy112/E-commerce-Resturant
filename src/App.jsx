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

function App() {
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
      ],
    },
  ]);
  return <RouterProvider router={Routing} />;
}

export default App;
