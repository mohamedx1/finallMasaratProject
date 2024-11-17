import React, { useState } from "react";
import Mainbutn from "../../../common/buttons/Mainbutn";
import Mainlogo from "../../../../images/logo.svg";
import logo from "../../../../images/smallLogo.svg";
import { PanelLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleCollapse } from "../../../../store/sidebarCollaps/sidebarSlice";
import { useNavigate } from "react-router-dom";

export default function SideNav() {
  const { isExpended } = useAppSelector((state) => state.sideBar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(toggleCollapse());
  };
  return (
    <div
      className={
        isExpended
          ? "flex justify-between mb-2  "
          : "flex flex-col-reverse justify-center items-center  mb-4 "
      }
    >
      <div className=' '>
        {isExpended ? (
          <img
            className='  cursor-pointer w-32'
            src={Mainlogo}
            alt='logo'
            onClick={() => {
              navigate("/masarat/home");
            }}
          />
        ) : (
          <img
            className=' cursor-pointer w-6 '
            src={logo}
            alt='logo'
            onClick={() => {
              navigate("/masarat/home");
            }}
          />
        )}
      </div>
      <div className={isExpended ? " " : "mb-2"}>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={handleClick}
        >
          <PanelLeft />
        </Mainbutn>
      </div>
    </div>
  );
}
