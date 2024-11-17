import React from "react";
import UserInfo from "./userInfo/UserInfo";
import Subjects from "./subjects/Subjects";
import SideNav from "./sideNavInfo/SideNav";
import Settings from "./settings/settings";
import { useAppSelector } from "../../../store/hooks";

export default function UserSideBar() {
  const { isExpended } = useAppSelector((state) => state.sideBar);

  return (
    <>
      <div className={isExpended ? "  shadow-md " : " shadow-lg  "}>
        <div
          className={
            isExpended
              ? "fixed h-full p-4 flex flex-col justify-between  w-72 ml-10      z-50 bg-white"
              : "fixed h-full p-2 flex flex-col justify-between w-fit  align-middle bg-white  "
          }
        >
          <div className=''>
            <SideNav />
            <UserInfo />
            <Subjects />
          </div>
          <Settings />
        </div>
      </div>
    </>
  );
}
