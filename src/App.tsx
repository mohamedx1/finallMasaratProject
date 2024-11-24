import React, { useEffect } from "react";
import "./App.css";
import MainLayout from "./layouts/AppLayout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import UserInfo from "./components/masarat/userSideBar/userInfo/UserInfo";
import Home from "./components/masarat/hompage/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import OnBording from "./components/masarat/onBording/OnBording";
import axios from "axios";
import Dashboard from "./components/masarat/dashboard/Dashboard";
import Login from "./components/login/Login";
import ChooseLearningMethod from "./components/survay/ChooseLearningMethod";
import Priorities from "./components/survay/Priorities";
import Gard, { AuthGard } from "./components/Gard/Gard";
import { Helmet } from "react-helmet";
import logo from "../src/images/smallLogo.svg";

function App() {
  const mainRouter = createBrowserRouter([
    // { path: "/", element:  },

    {
      path: "/",
      element: (
        <>
          <AuthGard>
            <Login />
          </AuthGard>
        </>
      ),
    },
    {
      path: "/masarat/OnBording",
      element: (
        <Gard>
          <OnBording />
        </Gard>
      ),
    },
    {
      path: "/masarat",
      element: (
        <Gard>
          <MainLayout />
        </Gard>
      ),
      children: [
        {
          path: "/masarat/survay",
          element: (
            <Gard>
              <ChooseLearningMethod />
            </Gard>
          ),
        },
        {
          path: "/masarat/survay/priorities",
          element: (
            <Gard>
              <Priorities />
            </Gard>
          ),
        },
        {
          path: "/masarat/home",
          element: (
            <Gard>
              <Home />
            </Gard>
          ),
        },
        {
          path: "/masarat/dashboard",
          element: (
            <Gard>
              <Dashboard />
            </Gard>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={mainRouter} />
      </Provider>
    </>
  );
}

export default App;
