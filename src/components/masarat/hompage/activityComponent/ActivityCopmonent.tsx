import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import AssisstantBot from "../../assistantBot/AssisstantBot";
import { Button } from "../../../ui/Button";
import { Card, CardContent } from "../../../ui/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/Tooltip";
import vid from "../../../../images/video.jpg";

export default function ActivityComponent() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const token = localStorage.getItem("token") || "";
  const { content, message }: any = useAppSelector((state) => state.chatting);
  const sendedChat = useSelector((state: RootState) => state.chat.sendedChat);

  const handleVideoChange = (index: number) => {
    setCurrentVideo(index);
    setTimeout(() => {
      videoRefs.current[index]?.focus();
    }, 0);
  };

  const handleNextVideo = () => {
    if (currentVideo < content?.length - 1) {
      handleVideoChange(currentVideo + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideo > 0) {
      handleVideoChange(currentVideo - 1);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center relative p-4 bg-gray-50'>
      {content?.[0] && content[0]?.content_type === "VIDEO" ? (
        <>
          {/* Current Video */}
          <Card className='w-full max-w-4xl mb-8'>
            <CardContent className='p-4'>
              <div className='mb-2 text-sm text-gray-500'>
                فيديو {currentVideo + 1} من {content.length}
              </div>
              <h2 className='text-2xl font-bold mb-4'>
                {content[currentVideo]?.description}
              </h2>
              <video
                ref={(el) => (videoRefs.current[currentVideo] = el)}
                src={
                  content[currentVideo]?.video_contents?.url
                    ? `http://127.0.0.1:8000${content[currentVideo].video_contents.url}`
                    : ""
                }
                controls
                className='w-full h-64 object-contain'
                autoFocus
              />
              <div className='flex justify-around  mt-4 mx-auto '>
                <Button
                  className='w-fit p-1'
                  onClick={handleNextVideo}
                  disabled={currentVideo === content.length - 1}
                >
                  الفيديو التالي
                </Button>
                <div className=' max-w-4xl '>
                  <div className='flex gap-2  overflow-x-auto pb-4 '>
                    {content.map((video: any, index: number) => (
                      <TooltipProvider key={video.id}>
                        <Tooltip>
                          <TooltipTrigger asChild className=''>
                            <button
                              onClick={() => handleVideoChange(index)}
                              className='flex-shrink-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md '
                              aria-label={`Switch to video ${index + 1}`}
                            >
                              <div
                                className={`w-24 h-16 relative  overflow-hidden ${
                                  index === currentVideo
                                    ? "ring-2 ring-primary-300"
                                    : ""
                                }`}
                              >
                                <img
                                  src={vid}
                                  alt={`Thumbnail for video ${index + 1}`}
                                  className='w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                  ""
                                </div>
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{video.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
                <Button
                  className='w-fit p-1'
                  onClick={handlePreviousVideo}
                  disabled={currentVideo === 0}
                >
                  الفيديو السابق
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : content?.[0] && content[0]?.content_type === "DYNAMIC" ? (
        <Card className='w-full max-w-4xl mb-8 h-1/2'>
          <iframe
            className='w-full h-full'
            title='DYNAMIC'
            src={
              content[0]?.dynamic_contents?.url
                ? `http://127.0.0.1:8000${content[0]?.dynamic_contents.url}`
                : ""
            }
            frameBorder='0'
          />
        </Card>
      ) : (
        <div className='h-2/3 w-2/3'>
          <img src={vid} alt='' className='w-full' />
        </div>
      )}
      <AssisstantBot />
    </div>
  );
}
