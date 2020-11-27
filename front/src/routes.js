// Route Views
import Home from "./views/Home";
import Books from "./views/Books";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/books",
    component: Books
  }
]