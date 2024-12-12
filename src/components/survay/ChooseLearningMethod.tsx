import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { ExternalLink, Zap, Command, Layers2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const initialItems = [
  {
    id: 0,
    title: "الإجابة على بعض الأسئلة",
    description:
      "	شاركنا برأيك!  قم بالإجابة على مجموعة قصيرة من الأسئلة، وسنقوم بتحليلها لتحديد أسلوب التعلم الذي يناسبك.",
    icon: Zap,
  },
  {
    id: 1,
    title: "تحديد تفضيلاتك التعليمية",
    description:
      "	حدد أولوياتك بنفسك! قم بترتيب أساليب التعلم (بصري، سمعي، تجريبي، قرائي وكتابي) بناءً على تفضيلاتك الشخصية",
    icon: Layers2,
  },
  {
    id: 2,
    title: "التفاعل مع المحتوى",
    description:
      "	دعنا نقوم بالمهمة نيابةً عنك!  من خلال تفاعلك مع المحتوى سوف نكتشف أسلوبك المفضل",
    icon: Command,
  },
];

export default function ChooseLearningMethod() {
  const [selectedContent, setSelectedContent] = useState(initialItems[0]);
  const navigate = useNavigate();
  const ft = localStorage.getItem("fTime");
  useEffect(() => {
    if (ft !== "true") {
      navigate("/masarat/home");
    }
  }, []);

  const handelSubmit = () => {
    if (selectedContent.id === 1) {
      //   <Navigate to={"/masarat/survay/priorities"} />;
      navigate("/masarat/survay/priorities");

      return;
    }

    if (selectedContent.id === 0) {
      localStorage.setItem("second", "1");
      navigate("/masarat/home");
      return;
    }

    navigate("/masarat/home");
  };
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-primary-300 font-extrabold text-text-lg  md:w-full md:container lg:w-[700px] mb-5  '>
        لتحديد أسلوب تعلمك الأنسب قم بالاختيار بين البدائل التالية:
      </h1>
      <div className='flex  justify-center  items-center ' dir='rtl'>
        <div className=' md:w-full md:container lg:w-[700px]'>
          {initialItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => setSelectedContent(initialItems[index])}
              className={`p-4 cursor-pointer mb-4 transition-colors delay-200 ${
                selectedContent.id === index ? "bg-[rgba(112,79,230,0.1)] " : ""
              }`}
            >
              <div className='flex items-start gap-4'>
                <div className='flex  items-start gap-4 p-2 border-[6px] border-solid border-[#F9F5FF] rounded-full bg-[rgba(112,79,230,0.1)]'>
                  <item.icon className='h-5 w-5 text-[#7F56D9] shrink-0' />
                </div>
                <div className='flex-1'>
                  <h2
                    className={`font-semibold text-lg delay-200  ${
                      selectedContent.id === index ? "text-[#9747FF]" : ""
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={` text-base font-normal mt-1 delay-200 ${
                      selectedContent.id === index ? "text-[#8066E6]" : ""
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
          <div className='flex  justify-start'>
            <Button
              onClick={handelSubmit}
              className='bg-[#704FE6] hover:bg-purple-700 text-lg text-white'
            >
              <ExternalLink />
              تأكيد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
