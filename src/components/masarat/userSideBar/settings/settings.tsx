import React, { useState } from "react";
import {
  Camera,
  CameraOff,
  Clipboard,
  LogOut,
  VolumeOff,
  Volume2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/Button";

import Mainbutn from "./../../../common/buttons/Mainbutn";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeAcess } from "../../../../store/camerAcess/CamerAcsess";
import { useNavigate } from "react-router-dom";
import { toggleaudio } from "../../../../store/modalCollaps/ModalCollapseSlice";
import { Input } from "../../../ui/Input";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { audioIsOpend } = useAppSelector((state) => state.togegleModal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isExpended } = useAppSelector((state) => state.sideBar);
  const { camerIsAcsessable } = useAppSelector((state) => state.cameraAcsess);
  const navigate = useNavigate();

  const handleClickAceccable = async () => {
    dispatch(changeAcess(true));
  };
  const handleClickNotAceccable = async () => {
    dispatch(changeAcess(false));
  };
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token"); // Example: Clear token
    window.location.reload(); // Example: Reload page or redirect user
  };

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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Mainbutn
              pading='p-1'
              bg='bg-white'
              hvr='hover:bg-primary-300 hover:text-white'
              border='border-primary-100 border shadow-md'
              text='text-primary-300'
              onClick={() => setIsModalOpen(true)}
            >
              <LogOut />
            </Mainbutn>
          </DialogTrigger>
          {isModalOpen && (
            <DialogContent
              className='sm:max-w-[425px] rtl:text-right bg-white'
              dir='rtl'
            >
              <DialogHeader className='rtl:text-right p-2'>
                <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
              </DialogHeader>
              <p className='text-gray-700 mb-4'>
                هل أنت متأكد أنك تريد تسجيل الخروج؟
              </p>
              <DialogFooter className='flex justify-end gap-2'>
                <Button
                  className='bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400'
                  onClick={() => setIsModalOpen(false)} // Close the modal
                >
                  إلغاء
                </Button>
                <Button
                  className='bg-primary-300 text-white rounded-md px-4 py-2 hover:bg-primary-400'
                  onClick={handleLogout} // Logout and close the modal
                >
                  تأكيد
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

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
