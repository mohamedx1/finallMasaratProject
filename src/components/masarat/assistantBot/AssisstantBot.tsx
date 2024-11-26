import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import BootChatAvatat from "./../../common/bootChatAvatar/BootChatAvatat";
import BootChatBody from "./../../common/bootChatAvatar/BootChatBody";

interface UserStatus {
  is_concentrated: number;
  emotion: string;
}

export default function AssisstantBot() {
  const [allResponseArray, setAllResponseArray] = useState<UserStatus[]>([]);
  const [consecutiveUnavailable, setConsecutiveUnavailable] = useState(false);
  const [isConcentrated, setIsConcentrated] = useState(true);
  const { userStatues } = useAppSelector((state) => state.userState);
  const { audioIsOpend } = useAppSelector((state) => state.togegleModal);

  useEffect(() => {
    if (userStatues) {
      setAllResponseArray((prev) => {
        const updatedResponses = [...prev, userStatues];

        // Check every four responses
        if (updatedResponses.length >= 15) {
          // Calculate unavailability majority across all responses
          const unavailableCount = updatedResponses.filter(
            (res) => res.emotion === "Not-Attentive (student unavailable)"
          ).length;

          const concentratedCount = updatedResponses.filter(
            (res) => res.is_concentrated === 1
          ).length;

          // Determine majority of unavailability across the last 4 responses
          if (unavailableCount >= 8) {
            setConsecutiveUnavailable(true);
          } else if (concentratedCount >= 7) {
            // Determine majority concentration across the last 4 responses
            setIsConcentrated(true);
            setConsecutiveUnavailable(false);
          } else if (concentratedCount <= 7) {
            setIsConcentrated(false);
            setConsecutiveUnavailable(false);
          }
          // Clear the array after processing every 4 responses
          return [];
        }

        return updatedResponses;
      });
    }
  }, [userStatues]);

  useEffect(() => {
    if (consecutiveUnavailable && audioIsOpend) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        " يبدو أن الكاميرا تواجه مشكلة في قراءة تعابير الوجه. هل يمكك التحقق منها؟"
      );

      utterance.lang = "ar"; // Set language to Arabic
      window.speechSynthesis.speak(utterance);
    } else if (!isConcentrated && audioIsOpend) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "اتضح لى انك غير منتبه ، أنصحك بالتركيز و الانتباه"
      );
      utterance.lang = "ar"; // Set language to Arabic
      window.speechSynthesis.speak(utterance);
    } else {
    }
  }, [isConcentrated, consecutiveUnavailable]);

  return (
    <div className='absolute w-32 bottom-2 left-6 z-30  '>
      <div className='bg-primary-300 rounded-full p-2 '>
        <BootChatAvatat
          emotion={consecutiveUnavailable ? 0 : !isConcentrated ? 1 : 2}
        />
      </div>
      <div className='flex justify-center -mt-5'>
        <BootChatBody />
      </div>
      <div className={`absolute top-0 left-40 p-2 w-60 shadow-lg bg-white `}>
        <span className='text-gray-700'>المساعد الآلي</span>
        <div className='text-center text-gray-500 flex flex-col'>
          {consecutiveUnavailable ? (
            <>
              يبدو أن الكاميرا تواجه مشكلة في قراءة تعابير الوجه. هل يمكنك
              التحقق منها؟
            </>
          ) : isConcentrated ? (
            <>اهلا بك اتمنى لك رحلة تعلم سعيدة</>
          ) : (
            !isConcentrated && (
              <>اتضح لى انك غير منتبه ، أنصحك بالتركيز و الانتباه</>
            )
          )}
          {/* Show the button only if the student is not concentrated and unavailable */}
          {(!isConcentrated || consecutiveUnavailable) && (
            <button
              onClick={() => {
                setAllResponseArray([
                  { is_concentrated: 1, emotion: "neutral" },
                ]);
                setIsConcentrated(true); // Reset to concentrated
                setConsecutiveUnavailable(false);
              }}
              className='p-2 bg-primary-300 text-white rounded-2xl mt-2'
            >
              استكمال الدرس
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
