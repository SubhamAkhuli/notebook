import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// new react router process  import  createBrowserRouter, RouterProvider from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

// new react router process  create a router
const router = createBrowserRouter([
  {
    // path is the url path
    path: "/",
    // element is the component to be rendered
    element: <>
      <Navbar title="NoteBook" about="About" />
      <Home />
    </>,
  },
  {
    path: "/about",
    element: <>
      <Navbar title="NoteBook" about="About" />
      <About />
    </>,
  }]);

function App() {
  return (
    <>
    {/* NoteState set the range of the context  */}
      <NoteState>
      {/* to call the pages */}
      <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App;
