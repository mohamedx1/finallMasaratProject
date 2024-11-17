import React from "react";
import BootChatBody from "../../common/bootChatAvatar/BootChatBody";
import BootChatAvatat from "../../common/bootChatAvatar/BootChatAvatat";

export default function WelcomeChattBot({ message }) {
  return (
    <div className='absolute w-32 bottom-2 left-6 z-30  '>
      <div className='bg-primary-300 rounded-full p-2 '>
        <BootChatAvatat emotion={0} />
      </div>
      <div className='flex justify-center -mt-5'>
        <BootChatBody />
      </div>
      <div className={`absolute top-0 left-40 p-2 w-60 shadow-lg bg-white `}>
        <span className='text-gray-700'>المساعد الآلي</span>
        <div className='text-center text-gray-500 flex flex-col'>{message}</div>
      </div>
    </div>
  );
}
