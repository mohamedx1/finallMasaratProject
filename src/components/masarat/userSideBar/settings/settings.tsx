import React, { useState } from "react";
import {
  Camera,
  CameraOff,
  Volume1,
  Clipboard,
  LogOut,
  Play,
  VolumeOff,
  Volume2,
} from "lucide-react";
import Mainbutn from "./../../../common/buttons/Mainbutn";
import CustomSlider from "./../../../common/slider/CustomSlider";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeAcess } from "../../../../store/camerAcess/CamerAcsess";
import { useNavigate } from "react-router-dom";
import { toggleaudio } from "../../../../store/modalCollaps/ModalCollapseSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const [sliderValue, setSliderValue] = useState(80);
  const { audioIsOpend } = useAppSelector((state) => state.togegleModal);

  const { isExpended } = useAppSelector((state) => state.sideBar);
  const { camerIsAcsessable } = useAppSelector((state) => state.cameraAcsess);
  const navigate = useNavigate();

  const handleClickAceccable = async () => {
    dispatch(changeAcess(true));
  };
  const handleClickNotAceccable = async () => {
    dispatch(changeAcess(false));
  };
  // Custom styles

  return (
    <div className={`mt-4 ${isExpended ? "" : "mx-auto"} `}>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={
            camerIsAcsessable ? handleClickNotAceccable : handleClickAceccable
          }
        >
          {camerIsAcsessable ? <Camera /> : <CameraOff />}
        </Mainbutn>
        <div
          className={
            isExpended ? "text-gray-700 w-1/2 " : "w-0 overflow-hidden "
          }
        >
          تفعيل الكاميرا
        </div>
      </div>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
        <div className='my-auto '>
          <Mainbutn
            pading={"p-1"}
            bg={"bg-white"}
            hvr={"hover:bg-primary-300 hover:text-white"}
            border={"border-primary-100  border shadow-md"}
            text={"text-primary-300"}
            onClick={() => {
              window.speechSynthesis.cancel();
              dispatch(toggleaudio());
            }}
          >
            {audioIsOpend ? <Volume2 /> : <VolumeOff />}
          </Mainbutn>
        </div>
        <div className=''>
          <div
            className={
              isExpended
                ? "text-gray-700 "
                : "hidden transition-all duration-300 ease-in-out"
            }
          >
            <div>صوت المساعد الآلي</div>
          </div>
        </div>
      </div>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={() => navigate("/masarat/dashboard")}
        >
          <Clipboard />
        </Mainbutn>
        <div
          className={
            isExpended
              ? "text-gray-700 w-fit"
              : "w-0 overflow-hidden transition-all duration-300 ease-in-out"
          }
        >
          لوحة التحكم الأبوي
        </div>
      </div>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={() => {
            navigate("/");
            localStorage.removeItem("token");
          }}
        >
          <LogOut />
        </Mainbutn>
        <div
          className={
            isExpended
              ? "text-gray-700  transition-all duration-300 ease-in-out"
              : "w-0 overflow-hidden transition-all duration-300 ease-in-out "
          }
        >
          تسجيل الخروج
        </div>
      </div>
    </div>
  );
}
