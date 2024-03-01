import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// new react router process  import  createBrowserRouter, RouterProvider from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Alert from "./components/Alert";
import Main from "./components/Main";
import Profile from "./components/User/Profile";


function App() {

  // show alert
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  // new react router process  create a router
  const router = createBrowserRouter([
    {
      // path is the url path
      path: "/home",
      // element is the component to be rendered
      element: <>
        <Navbar title="NoteBook" about="About" />
        <Alert alert={alert} />
        <Home showAlert={showAlert} />

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
        <Alert alert={alert} />
        <Signup showAlert={showAlert} />

      </>,
    },
    {
      path: "/login",
      element: <>

        <Navbar title="NoteBook" about="About" />
        <Alert alert={alert} />
        <Login showAlert={showAlert} />

      </>,
    },
    {
      // path is the url path
      path: "/",
      // element is the component to be rendered
      element: <>
        <Navbar title="NoteBook" about="About" />
        <Alert alert={alert} />
        <Main/>

      </>,
    }
    ,
    {
      path: "/profile",
      element: <>

        <Navbar title="NoteBook" about="About" />
        <Alert alert={alert} />
        <Profile showAlert={showAlert} />

      </>,
    }]);

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
