import { useState } from "react";
import { Card } from "../ui/Card";
import {
  Eye,
  Instagram,
  Network,
  Play,
  Menu,
  Share,
  ExternalLink,
  Zap,
  Command,
  Layers2,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Navigate, useNavigate } from "react-router-dom";

const initialItems = [
  {
    id: 0,
    title: "التفاعل مع المحتوى",
    description:
      "من خلال استخدامك المستمر لمنصة مسارات، يتم تحليل تفاعلك مع المحتويات المختلفة لمعرفة أسلوب التعلم الذي يناسبك بشكل أفضل (بصري، سمعي، تجريبي، أو منطقي). تعتمد هذه الطريقة على مراقبة تفاعلك واختيار المحتويات التي تفضلها.",
    icon: Command,
  },
  {
    id: 1,
    title: "الإجابة على بعض الأسئلة",
    description:
      "من خلال إجابتك على مجموعة من الأسئلة الموجهة، تستطيع منصة مسارات تحديد أسلوب تعلمك بدقة. ستساعدك هذه الأسئلة على فهم احتياجاتك التعليمية وتوجيهك نحو المحتويات التي تناسب طريقة تفكيرك.",
    icon: Zap,
  },
  {
    id: 2,
    title: "تحديد تفضيلاتك التعليمية",
    description:
      "يمكنك تحديد تفضيلاتك التعليمية بشكل مباشر عن طريق اختيار الأساليب التعليمية التي تفضلها (بصري، سمعي، تجريبي، أو منطقي). بناءً على هذه التفضيلات، ستقوم المنصة بتخصيص المحتوى المناسب لك.",
    icon: Layers2,
  },
];

export default function ChooseLearningMethod() {
  const [selectedContent, setSelectedContent] = useState(initialItems[0]);
  const navigate = useNavigate();
  const handelSubmit = () => {
    if (selectedContent.id === initialItems[2].id) {
      //   <Navigate to={"/masarat/survay/priorities"} />;
      navigate("/masarat/survay/priorities");
      console.log(selectedContent.id, initialItems[2].id);
    } else {
      <Navigate to={"/masarat/home"} />;
    }
  };
  return (
    <div className='flex justify-center h-screen items-center ' dir='rtl'>
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
  );
}
