import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// new react router process  import  createBrowserRouter, RouterProvider from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
// import Alert from "./components/Alert";

// new react router process  create a router
const router = createBrowserRouter([
  {
    // path is the url path
    path: "/",
    // element is the component to be rendered
    element: <>
      <Navbar title="NoteBook" about="About" />
      {/* <Alert message="Success! Your note has been added successfully."/> */}
      <Home />
    </>,
  },
  {
    path: "/about",
    element: <>
      <Navbar title="NoteBook" about="About" />
      <About />
    </>,
  },
  {
    path: "/signup",
    element: <>
      <Navbar title="NoteBook" about="About" />
      <Signup />
    </>,
  },
  {
    path: "/login",
    element: <>
      <Navbar title="NoteBook" about="About" />
      <Login />
    </>,
  }]);

function App() {
  return (
    <>
      {/* set the range of the context  */}
      <NoteState>
        {/* context available from here to */}
        {/* to call the pages */}
        <RouterProvider router={router} />
        {/* here */}
      </NoteState>
    </>
  );
}

export default App;
