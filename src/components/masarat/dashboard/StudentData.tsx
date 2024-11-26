import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/Chart";
export default function StudentData({ charts }: any) {
  if (!charts) {
    return <div>Loading...</div>; // or any other loading state
  }
  const mockData = {
    // Top metrics
    final_exam_grade: charts?.final_exam_grade,

    // Time distribution for the middle circular chart
    total_time_per_phase: [
      {
        name: "تمهيد",
        value: charts?.total_time_per_phase?.INTRO_CONTENT,
        color: "#704FE6",
      },
      {
        name: "اختبار مبدأي",
        value: charts?.total_time_per_phase?.INTRO_EXAM,
        color: "#9B84EE",
      },
      {
        name: "اختبار تمهيدي",
        value: charts?.total_time_per_phase?.CONCEPTUAL_EXAM,
        color: "#DEC8FE",
      },
      {
        name: "شرح",
        value: charts?.total_time_per_phase?.EXPLANATION_CONTENT,
        color: "#704FE6",
      },
      {
        name: "اسألة على الشرح",
        value: charts?.total_time_per_phase?.EXPLANATION_EXAM,
        color: "#9B84EE",
      },
      {
        name: "مفهوم سابق",
        value: charts?.total_time_per_phase?.PREVIOUS_CONTENT_CONTENT,
        color: "#DEC8FE",
      },
      {
        name: "اسألة على المفوم السابق",
        value: charts?.total_time_per_phase?.PREV_REVISION_EXAM,
        color: "#704FE6",
      },
      {
        name: "تطبيقات",
        value: charts?.total_time_per_phase?.PRACTICE_VIDEOS_CONTENT,
        color: "#9B84EE",
      },
      {
        name: "تدريبات وتمارين",
        value: charts?.total_time_per_phase?.EXERCISES_CONTENT,
        color: "#DEC8FE",
      },
      {
        name: "الإختبار النهائي",
        value: charts?.total_time_per_phase?.FINAL_ASSESSMENT_EXAM,
        color: "#704FE6",
      },
    ],

    // First row of concept metrics
    highest_scores_per_phase: [
      {
        label: "تقويم مبدأي",
        value: charts?.highest_scores_per_phase.INTRO_EXAM,
      },
      {
        label: "تمهيد",
        value: charts?.highest_scores_per_phase.INTRO_EXAM,
      },
      {
        label: "شرح",
        value: charts?.highest_scores_per_phase.EXPLANATION_EXAM,
      },
      {
        label: "أمثله تطبيقيه",
        value: charts?.highest_scores_per_phase.EXERCISES_EXAM,
      },
      {
        label: "التدريبات",
        value: charts?.highest_scores_per_phase.EXERCISES_EXAM,
      },
      {
        label: "اسألة على الدروس السابقة",
        value: charts?.highest_scores_per_phase.PREV_REVISION_EXAM,
      },
      {
        label: "اختبار نهائي",
        value: charts?.highest_scores_per_phase.FINAL_ASSESSMENT_EXAM,
      },
    ],
    topic_percentages: [
      {
        label: "نظرية فيثاغورس",
        value: charts.topic_percentages.PYTHAGOREAN_THEOREM.correct_percentage,
      },
      {
        label: "اسس",
        value: charts.topic_percentages.EXPONENTS.correct_percentage,
      },
      {
        label: "الجذر التربيعي",
        value: charts.topic_percentages.SQUARE_ROOT.correct_percentage,
      },
      {
        label: "مساحات الأشكال الهندسية",
        value:
          charts.topic_percentages.GEOMETRIC_SHAPES_AREAS.correct_percentage,
      },
    ],
  };

  const total_time_per_phaseKey = charts?.total_time_per_phase
    ? Object.values(charts?.total_time_per_phase) // No need for the extra array
    : []; // Initialize as an empty array instead of an object

  const totalValue: any = total_time_per_phaseKey
    .flat() // Flatten the array if needed
    .reduce((sum: any, currentValue) => sum + currentValue, 0); // Sum all values
  const hidingOut =
    "text-center font-semibold bg-primary-300 text-white w-fit my-4  rounded-2xl px-2 py-1 mx-auto";
  const hidingIn =
    "text-center text-texm font-medium  mt-4 bg-primary-100 text-primary-300 w-fit   rounded-2xl px-2 py-2";

  const chartConfig = {
    total_time: {
      label: "إجمالي زمن وقت التعلم",
      color: "#0000",
    },
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-8 '>
        <div className='p-4 bg-gray-100'>
          <h3 className={`${hidingIn} mx-auto `}>إجمالي إتقان نواتج التعلم</h3>
          <div className='h-[120px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={[
                    { value: Number(charts?.final_exam_grade || 0) },
                    { value: 100 - Number(charts?.final_exam_grade || 0) },
                  ]}
                  dataKey='value'
                  innerRadius={40}
                  outerRadius={50}
                >
                  <Cell fill='#7C3AED' />
                  <Cell fill='#FDB913' />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='text-center -mt-2'>
              <span className='text-2xl font-bold'>
                {charts?.final_exam_grade}%
              </span>
            </div>
          </div>
        </div>
        <div className='p-2 bg-gray-100'>
          <h3 className={`${hidingIn} mx-auto sm:mb-4 `}>
            إجمالي زمن وقت التعلم
          </h3>
          <div className=''>
            <ChartContainer
              title='إجمالي زمن وقت التعلم'
              className='h-full'
              config={chartConfig}
            >
              <ResponsiveContainer className={""}>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={mockData?.total_time_per_phase}
                    dataKey='value'
                    nameKey='name'
                    innerRadius={35}
                    outerRadius={50}
                  >
                    {mockData?.total_time_per_phase.map(
                      (entry: any, index: any) => (
                        <Cell key={index} fill={entry.color} />
                      )
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className='text-center -mt-2'>
              <span className='text-lg inline-block font-bold '>
                {totalValue}/د
              </span>
            </div>
          </div>
        </div>
        <div className='p-4 bg-gray-100'>
          <h3 className={`${hidingIn} mx-auto`}>معدل استكمال الدروس</h3>
          <div className='h-[130px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={[
                    { value: Number(charts?.progress_percentage) },
                    { value: 100 - Number(charts?.progress_percentage) },
                  ]}
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={180}
                  endAngle={0}
                  dataKey='value'
                >
                  <Cell fill='#7C3AED' />
                  <Cell fill='#E5E7EB' />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='text-center -mt-4'>
              <span className='text-2xl font-bold'>
                {Number(charts?.progress_percentage).toFixed() + "%"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='space-y-8'>
        <h3 className={`${hidingOut}`}>معدل اتقان المفاهيم ومكونات الدرس</h3>
        <div className=' '>
          <div className='flex justify-center'>
            <h3 className={`${hidingIn} mb-5 `}>
              معدل اتقان المفاهيم ومكونات الدرس
            </h3>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-10 mb-4 bg-gray-100 '>
            {mockData?.highest_scores_per_phase.map(
              (metric: any, index: any) => (
                <div key={index} className='p-4'>
                  <h4 className=' text-center text-nowrap '>{metric.label}</h4>
                  <div className='h-[100px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={[
                            { value: Number(metric.value) },
                            { value: 100 - Number(metric.value) },
                          ]}
                          dataKey='value'
                          innerRadius={30}
                          outerRadius={40}
                        >
                          <Cell fill='#FDB913' />
                          <Cell fill='#7C3AED' />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className='text-center -mt-2'>
                      <span className='font-bold'>{metric.value}%</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <h3 className={`${hidingIn} mb-3 mt-8 mx-auto `}>
            معدل اتقان المفاهيم السابقة
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 '>
            {mockData?.topic_percentages.map((metric: any, index: any) => (
              <div key={index} className='p-4 bg-gray-100'>
                <h4 className='text-md  text-center text-nowrap '>
                  {metric.label}
                </h4>
                <div className='h-[100px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={[
                          { value: Number(metric.value) },
                          { value: 100 - Number(metric.value) },
                        ]}
                        dataKey='value'
                        innerRadius={30}
                        outerRadius={40}
                      >
                        <Cell fill='#FDB913' />
                        <Cell fill='#7C3AED' />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className='text-center -mt-2'>
                    <span className='font-bold'>
                      {Number(metric.value).toFixed()}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
