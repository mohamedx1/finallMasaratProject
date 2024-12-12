import React, { useRef, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
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
import { BASE_API_URL } from "../../../../config";
interface VideoContent {
  id: string;
  content_type: string;
  description: string;
  video_contents: {
    url: string;
  };
}

interface DynamicContent {
  content_type: string;
  dynamic_contents: {
    url: string;
  };
}

export default function ActivityComponent() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { content } = useAppSelector((state: RootState) => state.chatting);

  const handleVideoChange = (index: number) => {
    setCurrentVideo(index);
    setTimeout(() => {
      videoRefs.current[index]?.focus();
    }, 0);
  };

  const handleNextVideo = () => {
    if (currentVideo < (content?.length ?? 0) - 1) {
      handleVideoChange(currentVideo + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideo > 0) {
      handleVideoChange(currentVideo - 1);
    }
  };

  const renderVideoContent = (videoContent: VideoContent[]) => {
    const isSingleVideo = videoContent.length === 1;

    return (
      //  -------------------------------------start header video------------------------------------------------
      <Card className='w-full max-w-2xl mb-8 border-none md:mt-12 mt-40  '>
        <CardContent className='p-4'>
          <div className='mb-2 text-sm text-gray-500'>
            فيديو {currentVideo + 1} من {videoContent.length}
          </div>
          <h2 className='text-2xl font-bold mb-4'>
            {videoContent[currentVideo]?.description}
          </h2>
          {/* -------------------------------------End header video------------------------------------------------ */}
          {/* -------------------------------------start next and prev video------------------------------------------------ */}
          {!isSingleVideo && (
            <div className='flex flex-col sm:flex-row justify-between items-center mt-4'>
              <Button
                className='w-full sm:w-auto mb-2 sm:mb-0'
                onClick={handlePreviousVideo}
                disabled={currentVideo === 0}
              >
                الفيديو السابق
              </Button>
              <div className='flex gap-2 overflow-x-auto pb-4 max-w-full'>
                {videoContent.map((video, index) => (
                  <TooltipProvider key={video.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleVideoChange(index)}
                          className='flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md'
                          aria-label={`Switch to video ${index + 1}`}
                        >
                          <div
                            className={`w-24 h-16 relative overflow-hidden ${
                              index === currentVideo
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                          >
                            <img
                              src={vid}
                              alt={`Thumbnail for video ${index + 1}`}
                              className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white'>
                              {index + 1}
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

              <Button
                className='w-full sm:w-auto mt-2 sm:mt-0'
                onClick={handleNextVideo}
                disabled={currentVideo === videoContent.length - 1}
              >
                الفيديو التالي
              </Button>
            </div>
          )}

          <video
            ref={(el) => (videoRefs.current[currentVideo] = el)}
            src={BASE_API_URL + videoContent[currentVideo]?.video_contents?.url}
            controls
            className='w-full aspect-video object-contain'
            autoFocus
          />
        </CardContent>
      </Card>
    );
  };

  const renderDynamicContent = (dynamicContent: DynamicContent) => (
    <Card className='w-full max-w-2xl mb-8 h-[calc(100vh-20rem)] md:mt-28'>
      <iframe
        className='w-full h-full'
        title='Dynamic Content'
        src={BASE_API_URL + dynamicContent.dynamic_contents.url}
        frameBorder='0'
      />
    </Card>
  );

  return (
    <div className='min-h-screen flex flex-col items-center relative p-4 bg-gray-50'>
      {content && content.length > 0 ? (
        content[0].content_type === "VIDEO" ? (
          renderVideoContent(content as VideoContent[])
        ) : content[0].content_type === "DYNAMIC" ? (
          renderDynamicContent(content[0] as DynamicContent)
        ) : (
          <div className='h-2/3 w-2/3'>
            <img
              src={vid}
              alt='Placeholder'
              className='w-full h-full object-cover'
            />
          </div>
        )
      ) : (
        <div className='h-2/3 w-2/3'>
          <img
            src={vid}
            alt='Placeholder'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      <AssisstantBot />
    </div>
  );
}
