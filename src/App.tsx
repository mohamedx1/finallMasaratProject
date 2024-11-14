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

function App() {
  const data = {
    username: "newuser",
    password: "password123",
  };

  async function login() {
    try {

      const response = await axios.post<any>(
        "http://127.0.0.1:8000/users/login/",
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.access);
    } catch (err) {
      return <>لديك مشكلة في الإنترنت</>
    }
  }

  useEffect(() => {
    login();
  }, []);
  const mainRouter = createBrowserRouter([
    // { path: "/", element: <VideoCapture /> },
    { path: "/", element: <OnBording /> },
    { path: "/masarat/dashboard", element: <Dashboard /> },
    {
      path: "/masarat",
      element: <MainLayout />,
      children: [
        {
          path: "/masarat/home",
          element: <Home />,
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
