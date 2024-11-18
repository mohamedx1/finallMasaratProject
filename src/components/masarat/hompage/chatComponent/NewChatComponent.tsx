import React, { useState, useRef, useEffect } from "react";
import style from "./chat.module.css";
import BootChatAvatat from "../../../common/bootChatAvatar/BootChatAvatat";
import MainButton from "../../../common/buttons/Mainbutn";
import { ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getMainChat } from "../../../../store/mainChat/mainChatSlice";
import getRestoreChat from "../../../../store/restoreMainChatt/act/actChatting";
import { aiChatt } from "../../../../store/chattWithAi/chattAiSlice";
import avatar from "../../../../images/userImage.jpg";

import {
  arrayToSend,
  resetChat,
  updateLastEntry,
} from "../../../../store/arrayToSend/arraySlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import VideoCapture from "../../../common/camerCopmponent/CameraComponent";
import { toggleModal } from "../../../../store/modalCollaps/ModalCollapseSlice";
import { changeAcess } from "../../../../store/camerAcess/CamerAcsess";
import Modal from "../../../common/modal/Modal";
import { useNavigate } from "react-router-dom";
type Message = {
  [x: string]: any;
  id?: string;
  lesson?: string;
  question_text?: string;
  student_answer?: string;
};

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // this array for track the questions
  const [chatToSend, setChatToSend] = useState<any>([]);

  // this array to contain allchat
  const [allChat, setAllChat] = useState<any>([]);

  // this array to send to back end becuse if send the whole chat repeated will make issuse
  // const [sendChat, setSendChat] = useState<Message[]>([]);

  const [inputMessage, setInputMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token") || "";
  const {
    content,
    message,
    options,
    isLoading: sendingLoading,
  } = useAppSelector((state) => state.chatting);
  const { messages: initialMessages } = useAppSelector(
    (state) => state.restoreMessages
  );
  const { aiResponse, isLoading: aiLoading } = useAppSelector(
    (state) => state.aiResonse
  );
  const sendedChat = useSelector((state: RootState) => state.chat.sendedChat);
  const { camerIsAcsessable } = useAppSelector((state) => state.cameraAcsess);
  const { ModalIsOpend, audioIsOpend } = useAppSelector(
    (state) => state.togegleModal
  );

  useEffect(() => {
    dispatch(getRestoreChat(token));
  }, [dispatch, token]);

  // camera
  useEffect(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  useEffect(() => {
    if (initialMessages.length !== 0) {
      setAllChat(initialMessages);
    }
  }, [initialMessages]);
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChat]);
  useEffect(() => {
    return () => {
      // Ensure content is not empty and the first element has an id or question_text
      if (content && content?.[0]?.id && content?.[0]?.question_text) {
        dispatch(
          getMainChat({
            token,
            content: [{ question_text: message }, ...content],
          })
        );
        console.log("Dispatched with updated content");
      } else {
        console.log("Content or message is not available");
      }
    };
  }, []); // Make sure to include dependencies

  // Restore chat on component mount
  // useEffect(() => {
  //   dispatch(getRestoreChat(token));
  // }, [token]);

  // Start main chat if no restored messages are present
  // useEffect(() => {
  //   if (initialMessages.length === 0) {
  //     dispatch(getMainChat({ token, content: chatToSend }));
  //   }
  // }, [initialMessages]);

  // Initialize first question in chat
  console.log(options);
  useEffect(() => {
    if (options?.length > 1) {
      setAllChat((prevMessages: any) => [
        ...prevMessages,
        {
          question_text: content,
          lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
        },
      ]);
      dispatch(
        arrayToSend([
          {
            question_text: content,
            lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
          },
        ])
      );

      return;
    }
    if (content && content.length > 0) {
      message.trim() &&
        setAllChat((prevMessages: any) => [
          ...prevMessages,
          {
            question_text: message,
            lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
          },
        ]);
      // message.trim() && setSendChat((prevMessages) => [...prevMessages, { question_text: message, lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }])
      dispatch(
        arrayToSend([
          {
            question_text: message,
            lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
          },
        ])
      );
      if (content?.[0].id && !content?.[0].content_type) {
        // setSendChat((prevMessages) => [...prevMessages, content?.[0]]);
        dispatch(arrayToSend([content?.[0]]));
        setAllChat((prevMessages: any) => [...prevMessages, content?.[0]]);
      }
    } else if (message && content?.length < 1) {
      setAllChat((prevMessages: any) => [
        ...prevMessages,
        {
          question_text: message,
          lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
        },
      ]);
      // setSendChat((prevMessages) => [...prevMessages, { question_text: message, lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }])
      dispatch(
        arrayToSend([
          {
            question_text: message,
            lesson: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
          },
        ])
      );
    }
  }, [content]);

  console.log(allChat);
  console.log(content);
  // Handle sending a new message

  useEffect(() => {
    if (aiResponse && aiResponse.answer) {
      // Add the aiResponse to chat states

      setAllChat((prev: any) => [...prev, { answer: aiResponse.answer }]);
      // setSendChat((prev) => [...prev, aiResponse]);
      dispatch(arrayToSend([aiResponse]));
      // Check if there’s a Base64 audio string and play it

      if (audioIsOpend) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(aiResponse.answer);
        utterance.lang = "ar"; // Set language to Arabic
        window.speechSynthesis.speak(utterance);
      }
    }
    console.log(aiResponse);
  }, [aiResponse]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    // Check if we're past the current message length or have limited content
    if (
      currentMessage > content?.length - 1 ||
      (content?.length > 0 && content?.length < 2) ||
      (!content && !message)
    ) {
      // Add the user's message to allChat
      setAllChat((prev: any) => [...prev, { question: inputMessage }]);
      // setSendChat((prev) => [
      //   ...prev,
      //   { question: inputMessage }
      // ])
      dispatch(arrayToSend([{ question: inputMessage }]));

      // Dispatch the action to get AI response
      const userResponse = { question: inputMessage };
      dispatch(aiChatt({ userResponse, token }));

      setInputMessage("");
      return;
    }

    let processedAnswer: any = inputMessage;
    const questionType = content?.[currentMessage]?.question_type;

    switch (questionType) {
      case "SORTING":
        processedAnswer = inputMessage.split(",").map((item) => item.trim());
        break;
      case "MULTIPLE_CHOICE":
        processedAnswer = inputMessage;
        break;
      case "TRUE_FALSE":
        processedAnswer =
          inputMessage.toLowerCase() === "صح"
            ? true
            : inputMessage.toLowerCase() === "خطأ"
            ? false
            : inputMessage;
        break;
      default:
        processedAnswer = inputMessage;
    }

    const newMessage = { student_answer: processedAnswer };

    // setSendChat((prev) => {
    //   const updatedChat = [...prev];

    //   // Update the last entry to include the student's answer
    //   if (updatedChat.length > 0) {
    //     updatedChat[updatedChat.length - 1] = {
    //       ...updatedChat[updatedChat.length - 1],
    //       student_answer: processedAnswer,
    //     };
    //   }

    //   // Add a new entry for the next question, if there's a next question
    //   if (currentMessage < content.length) {
    //     const nextQuestion = content[currentMessage + 1];
    //     updatedChat.push({ ...nextQuestion, student_answer: "" });
    //   }

    //   return updatedChat;
    // });
    dispatch(updateLastEntry({ processedAnswer, content, currentMessage }));

    // Update allChat with the student's answer to the current question and add a new question if needed
    setAllChat((prev: any) => {
      const updatedChat = [...prev];

      // Update the last entry to include the student's answer
      if (updatedChat?.length > 0 && content?.length > 1) {
        updatedChat[updatedChat.length - 1] = {
          ...updatedChat[updatedChat.length - 1],
          // cause: updatedChat[updatedChat.length - 1].cause,
          correct:
            updatedChat[updatedChat.length - 1].mcq_question?.correct_answer ||
            (updatedChat[
              updatedChat.length - 1
            ].sorting_question?.correct_order)?.join(", ") ||
            updatedChat[updatedChat.length - 1].long_answer_question
              ?.correct_answer ||
            String(
              updatedChat[updatedChat.length - 1].true_false_question
                ?.correct_answer
            )
              .replace("false", "خطأ")
              .replace("true", "صح"),
          student_answer: Array.isArray(processedAnswer)
            ? inputMessage // Convert array to a comma-separated string, or handle it as needed
            : typeof processedAnswer === "boolean"
            ? inputMessage
            : processedAnswer,
        };
      } else {
        // this when the user take to the ai
        updatedChat.push({
          ...updatedChat,

          student_answer: inputMessage,
        });
      }

      // Add a new entry for the next question, if there's a next question
      if (currentMessage < content?.length) {
        const nextQuestion = content?.[currentMessage + 1];
        updatedChat.push({ ...nextQuestion, student_answer: "" });
      }

      return updatedChat;
    });

    // Update chatToSend state for sending message data
    setChatToSend((prevChat: any) => {
      const updatedChat = [...prevChat];

      if (content?.[currentMessage]) {
        updatedChat[currentMessage] = {
          ...content[currentMessage],
          ...newMessage,
        };
      } else {
        updatedChat.push({
          ...newMessage,
          // id: "default-id",
          lesson: "default-lesson-id",
        });
      }

      return updatedChat;
    });

    // Clear input field and move to the next question or reset if at the end
    if (currentMessage < content?.length) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      if (
        allChat.length > 0 &&
        inputMessage &&
        currentMessage >= content?.length
      ) {
        // dispatch(getMainChat({ token, content: sendChat }));
        // setSendChat([])
        dispatch(resetChat());
      }
      setCurrentMessage(0); // Reset or handle end-of-content logic as needed
    }

    setInputMessage("");
  };

  const start = () => {
    dispatch(getMainChat({ token, content: sendedChat }));
    // setSendChat([])
    dispatch(resetChat());
    setCurrentMessage(0);
  };
  console.log(sendedChat);
  return (
    <div
      className={`flex flex-col ${
        allChat.length - 1 <= 0 ? " justify-center" : ""
      } rounded-lg shadow-md h-screen`}
    >
      {ModalIsOpend ? (
        <Modal>
          <div className='flex flex-col gap-2 items-center p-6 bg-white w-fit shadow-md'>
            <div className='w-16 bg-secondary-200 p-2 rounded-full'>
              <BootChatAvatat emotion={0} />
            </div>
            <h3 className='text-black text-text-xl font-extrabold'>
              السماح بالوصول للكاميرا؟
            </h3>
            <p className='text-gray-600'>
              لضمان رحلة تعلم افضل <br />
              اسمح لنا بتفعيل الكاميرة
            </p>
            <div className='flex justify-between gap-5'>
              <button
                onClick={() => {
                  dispatch(toggleModal());
                  dispatch(changeAcess(false));
                }}
                className='px-4 py-1 w-40 rounded-2xl border border-gray-500 hover:text-white hover:bg-primary-300 hover:border-none transition-all'
              >
                عدم السماح
              </button>
              <button
                onClick={() => {
                  dispatch(changeAcess(true));
                  dispatch(toggleModal());
                }}
                className='px-4 py-1 w-40 rounded-2xl text-white bg-primary-300 hover:text-black hover:bg-white hover:border hover:border-gray-500 transition-all'
              >
                سماح
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div
        className={`transition-all duration-300 ${
          allChat?.length - 1 <= 0 ? "h-0 " : "flex-1"
        } overflow-y-auto p-4 space-y-4 ${style.noScrollbar} ${
          style.chatComponent
        }`}
      >
        {allChat?.length > 0 &&
          allChat?.map((msg: any, index: number) => (
            <div
              key={index}
              className={` flex flex-col w-full ${
                msg?.student_answer || msg?.content?.student_answer
                  ? "justify-end"
                  : ""
              }`}
            >
              {(msg.question_text?.trim() ||
                msg?.content?.question_text?.trim() ||
                msg?.answer?.trim() ||
                msg?.content?.answer?.trim()) && (
                <>
                  <div className='flex gap-2 w-full mt-4'>
                    <div className='bg-secondary-300 w-14 p-1 rounded-full h-12 flex items-center justify-center'>
                      <BootChatAvatat emotion={0} />
                    </div>
                    <div className=' flex justify-between mt-4 w-4/5'>
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-l bg-transparent text-gray-800 flex flex-col `}
                      >
                        {msg?.question_text ||
                          msg?.content?.question_text ||
                          msg?.answer ||
                          msg?.content?.answer}
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    {msg?.mcq_question?.choices
                      ? msg?.mcq_question?.choices?.map(
                          (choice: any, ind: any) => {
                            const [key, value] = Object.entries(choice)[0];
                            return (
                              <div className='bg-secondary-300 px-4 py-2  rounded-lg mx-auto my-2'>
                                <span>
                                  {String(key)} :{String(value)}
                                </span>
                              </div>
                            );
                          }
                        )
                      : ""}
                  </div>
                </>
              )}
              {(msg?.student_answer !== undefined &&
                msg?.student_answer !== "") ||
              (msg?.content?.student_answer !== undefined &&
                msg?.content?.student_answer !== "") ||
              (msg?.question && !msg?.audio_base64) ||
              (msg?.content?.question && !msg?.content?.answer) ? (
                <div className='flex justify-end gap-2'>
                  <div className='w-fit bg-primary-300 text-white max-w-xs md:max-w-md px-4 py-2 rounded-lg'>
                    {typeof (
                      msg?.student_answer ?? msg?.content?.student_answer
                    ) === "boolean"
                      ? String(
                          msg?.student_answer ?? msg?.content?.student_answer
                        )
                          .replace("false", "خطأ")
                          .replace("true", "صح")
                      : Array.isArray(
                          msg?.student_answer ?? msg?.content?.student_answer
                        )
                      ? (
                          msg?.student_answer ?? msg?.content?.student_answer
                        ).join(", ")
                      : msg?.student_answer ??
                        msg?.content?.student_answer ??
                        msg?.question ??
                        msg?.content?.question}
                  </div>
                  <div className='w-12 '>
                    <img
                      src={avatar}
                      alt='user'
                      className='w-full rounded-full'
                    />
                  </div>
                </div>
              ) : null}
              {msg?.correct ? (
                <div
                  className={
                    msg?.correct ? `bg-gray-300 p-2 rounded-lg mt-3` : ""
                  }
                >
                  {msg?.correct ? (
                    <div className='font-bold'>
                      الإجابة الصحيحة :{msg?.correct}
                    </div>
                  ) : (
                    ""
                  )}

                  {msg?.cause}
                </div>
              ) : (
                <div
                  className={
                    msg?.content?.cause
                      ? `bg-gray-300 p-2 rounded-lg mt-3 w-60`
                      : ""
                  }
                >
                  {msg?.content?.mcq_question?.correct_answer ? (
                    <div className='font-bold'>
                      الإجابة الصحيحة :
                      {msg?.content?.mcq_question?.correct_answer}
                    </div>
                  ) : (
                    ""
                  )}
                  {msg?.content?.true_false_question?.correct_answer ? (
                    <div className='font-bold'>
                      الإجابة الصحيحة :
                      {String(
                        msg?.content?.true_false_question?.correct_answer
                      ) === "true"
                        ? "صح"
                        : "خطأ"}
                    </div>
                  ) : (
                    ""
                  )}
                  {msg?.content?.long_answer_question?.correct_answer ? (
                    <div className='font-normal'>
                      الإجابة الصحيحة :
                      {msg?.content?.long_answer_question?.correct_answer}
                    </div>
                  ) : (
                    ""
                  )}
                  {msg?.content?.sorting_question?.correct_order ? (
                    <div className='font-bold'>
                      الإجابة الصحيحة :
                      {msg?.content?.sorting_question?.correct_order}
                    </div>
                  ) : (
                    ""
                  )}
                  {msg?.content?.cause}
                </div>
              )}
            </div>
          ))}
        <div className='flex'>
          {options
            ? options.map((option: any, ind: any) => {
                const [key, value]: any = Object.entries(option)[0];
                return (
                  <button
                    key={ind}
                    className='bg-secondary-300 px-4 py-2  rounded-lg mx-auto my-2'
                    onClick={() => {
                      dispatch(getMainChat({ token, options: key }));
                      dispatch(resetChat());
                      setCurrentMessage(0);
                      switch (key) {
                        case "أ":
                          return navigate("/");
                      }
                    }}
                  >
                    <span>{value}</span>
                  </button>
                );
              })
            : ""}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 m-4 rounded-2xl bg-gray-100 flex flex-col gap-4'>
        <div
          className={`max-w-xs md:max-w-md px-4 py-2 rounded-l bg-transparent text-gray-800 `}
        >
          {currentMessage > content?.length - 1 ||
          (content?.length > 0 && content?.length - 1 < 1) ? (
            <div>
              أكتب سؤالك وسيقوم المساعد الألي بالرد عليك أو أضغط التالي لأستكمال
              الدرس ...
            </div>
          ) : (
            <div>قم بالإجابة علي الأسئله </div>
          )}
        </div>

        <div className='flex gap-2 rounded-lg overflow-hidden flex-wrap '>
          <input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='flex-1 rounded-md px-4 py-2 text-sm focus:outline-none '
            placeholder='أكتب اجابتك أو سؤالك وسيقوم المساعد الآلي بالإجابة عنه...'
          />
          {currentMessage > content?.length - 1 ||
          (content?.length > 0 && content?.length - 1 < 1) ||
          content?.[0]?.content_type === "VIDEO" ? (
            <button
              className={`bg-primary-300 text-white max-w-xs md:max-w-md px-4 py-2 rounded-lg`}
              onClick={start}
              disabled={sendingLoading === "pending"}
            >
              {sendingLoading === "pending" ? <span>loading..</span> : "التالي"}
            </button>
          ) : (
            ""
          )}
          <MainButton
            isloading={sendingLoading === "pending" || aiLoading === "pending"}
            onClick={handleSendMessage}
            pading={"p-2"}
            bg={"bg-primary-300"}
            hvr={"hover:bg-primary-200"}
            text={"text-white"}
          >
            {aiLoading === "pending" ? <span>loading..</span> : <ArrowUp />}
          </MainButton>
        </div>
      </div>

      {camerIsAcsessable && <VideoCapture />}
    </div>
  );
}
