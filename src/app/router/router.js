import { createBrowserRouter } from "react-router-dom";
import { Cart } from "../../pages/cart/Cart";
import { ComicDetails } from "../../pages/comic/ComicDetails";
import { ComicReading } from "../../pages/comic/ComicReading";
import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";
import { Search } from "../../pages/search/Search";
import { SignUp } from "../../pages/signup/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/details",
    element: <ComicDetails />,
  },
  {
    path: "/reading",
    element: <ComicReading />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);
