import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import UserSideBar from "../../components/masarat/userSideBar/UserSideBar";
// import getToken from "./../../store/login/act/actLogin";
import { useAppDispatch } from "./../../store/hooks";
import getUserData from "../../store/getUSerData/actGetUserData";
const MainLayout = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <>
      <div
        className={
          "max-w-8xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between gap-4 "
        }
      >
        <div className='  max-w-72 ml-8'>
          <UserSideBar />
        </div>
        <div className='flex-grow'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
