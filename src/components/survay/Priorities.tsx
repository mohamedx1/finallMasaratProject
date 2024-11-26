import { useState } from "react";
import { Card } from "../ui/Card";
import { Eye, Play, Menu, ExternalLink, Speaker, Layers2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../../config";

const initialItems = [
  {
    id: "Kinesthetic",
    title: "أسلوب التعلم التجريبي",
    description:
      "يعتمد هذا الأسلوب على التعلم من خلال التجربة العملية والمشاركة المباشرة في الأنشطة. المتعلمون التجريبيون يفضلون التفاعل المباشر والاختبار العملي لاكتساب المعرفة.",
    icon: Play,
  },
  {
    id: "Reading/Writing",
    title: "أسلوب التعلم المنطقي",
    description:
      "يعتمد المتعلمون المنطقيون على التفكير المنطقي والتحليل الرياضي لحل المشكلات وفهم المفاهيم. هم يميلون إلى التعلم من خلال التفكير النقدي والبحث عن العلاقات بين الأفكار.",
    icon: Layers2,
  },
  {
    id: "Auditory",
    title: "أسلوب التعلم السمعي",
    description:
      "يفضل المتعلمون السمعيون اكتساب المعرفة عن طريق الاستماع. هذا الأسلوب يناسب من يتعلمون بشكل أفضل من خلال المحاضرات، المناقشات، واللغات الصوتية.",
    icon: Speaker,
  },
  {
    id: "Visual",
    title: "أسلوب التعلم البصري",
    description:
      "يعتمد المتعلمون البصريون على الصور، الرسوم البيانية، والمخططات لفهم المعلومات. يفضلون التعلم من خلال رؤية المعلومات وتفسيرها بصرياً.",
    icon: Eye,
  },
];

export default function Priorities() {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handelSubmit = async () => {
    await axios.post(
      `${BASE_API_URL}/users/change-learning-type/`,
      {
        learning_type: items[0].id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/masarat/home");
  };
  return (
    <div className='flex justify-center h-screen items-center ' dir='rtl'>
      <div className=' mx-[40px] md:mx-0 w-full md:w-[80%] lg:w-[39vw]'>
        <Reorder.Group values={items} onReorder={setItems}>
          {items.map((item, index) => (
            <Reorder.Item key={item.id} value={item} className='bg-white'>
              <Card
                className={`p-4 mb-4 transition-colors delay-200 ${
                  index === 0 ? "bg-[rgba(112,79,230,0.1)] " : ""
                }`}
              >
                <div className='flex items-start gap-4'>
                  <div className='flex  items-start gap-4 p-2 border-[6px] border-solid border-[#F9F5FF] rounded-full bg-[rgba(112,79,230,0.1)]'>
                    <item.icon className='h-5 w-5 text-[#7F56D9] shrink-0' />
                  </div>
                  <div className='flex-1'>
                    <h2
                      className={`font-semibold text-lg  ${
                        index === 0 ? "text-[#9747FF]" : ""
                      }`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={` text-base mt-1  ${
                        index === 0 ? "text-[#8066E6]" : ""
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className='self-center'>
                    <Menu className='h-5 w-5 text-slate-400 flex-shrink-0 mt-1 cursor-move' />
                  </div>
                </div>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div className='flex  justify-start'>
          <Button
            onClick={handelSubmit}
            className='bg-[#704FE6] hover:bg-[#653fee] text-lg text-white'
          >
            <ExternalLink />
            تأكيد
          </Button>
        </div>
      </div>
    </div>
  );
}
