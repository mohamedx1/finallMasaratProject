import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/Chart";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ParentData({ charts }: { charts: any }) {
  const hidingOut =
    "text-center font-semibold bg-primary-300 text-white w-fit my-4 rounded-2xl px-2 py-1 mx-auto";
  const hidingIn =
    "text-center text-texm font-medium mt-4 bg-primary-100 text-primary-300 w-fit rounded-2xl px-2 py-1";
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const mockData = {
    // Radar charts data
    radarCharts: [
      {
        title: "اتقان انماط الاسئلة",
        dataKey: "blooms_level_percentage",
        blooms_level_percentage: [
          {
            subject: "تذكر",
            value: charts?.blooms_level_percentage?.REMEMBER?.correct || 0,
            fullMark: 12,
          },
          {
            subject: "فهم",
            value: charts?.blooms_level_percentage?.UNDERSTAND?.correct || 0,
            fullMark: 12,
          },
          {
            subject: "تقويم",
            value: charts?.blooms_level_percentage?.APPLY?.correct || 0,
            fullMark: 13,
          },
          {
            subject: "تحليل",
            value: charts?.blooms_level_percentage?.ANALYZE?.correct || 0,
            fullMark: 8,
          },
          {
            subject: " تطبيق",
            value: charts?.blooms_level_percentage?.EVALUATE?.correct || 0,
            fullMark: 13,
          },
          {
            subject: " ابداع",
            value: charts?.blooms_level_percentage?.CREATE?.correct || 0,
            fullMark: 5,
          },
        ],
      },
      {
        title: "اتقان مستويات الصعوبة",
        dataKey: "difficulty_level_percentage",
        difficulty_level_percentage: [
          {
            subject: "متوسط",
            value:
              charts?.difficulty_level_percentage?.BEGINNER?.correct_percentage,
          },
          {
            subject: "سهل",
            value:
              charts?.difficulty_level_percentage?.INTERMEDIATE
                ?.correct_percentage,
          },
          {
            subject: "صعب",
            value:
              charts?.difficulty_level_percentage?.ADVANCED?.correct_percentage,
          },
        ],
      },
      {
        title: "تقييم المهارات المعرفية",
        dataKey: "questions_type_percentage",
        questions_type_percentage: [
          {
            subject: "اختيار من المتعدد",
            value:
              charts?.questions_type_percentage?.MULTIPLE_CHOICE
                ?.correct_percentage,
          },
          {
            subject: "صح و غلط",
            value:
              charts?.questions_type_percentage?.TRUE_FALSE?.correct_percentage,
          },
          {
            subject: "ترتيب",
            value:
              charts?.questions_type_percentage?.SORTING?.correct_percentage,
          },
        ],
      },
    ],
    // Bottom pie charts
    attendanceData: {
      present: charts?.concentration_percentage?.attentive_percentage,
      absent: 100 - charts?.concentration_percentage?.attentive_percentage,
    },

    commitmentData: {
      committed: charts?.concentration_percentage?.concentration_percentage,
      notCommitted:
        100 - charts?.concentration_percentage?.concentration_percentage,
    },

    // Colors for consistent styling
    colors: {
      primary: "#7C3AED",
      secondary: "#FDB913",
      muted: "#E5E7EB",
    },
  };

  const renderPieChart = (data: any[], title: string) => (
    <div className='p-4'>
      <h4 className='text-sm text-center mb-4 text-[#7C3AED]'>{title}</h4>
      <div className='h-[150px]  flex items-center justify-center'>
        <ChartContainer
          config={{
            present: {
              label: "متواجد",
              color: "hsl(var(--chart-1))",
            },
            absent: {
              label: "غير متواجد",
              color: "hsl(var(--chart-2))",
            },
            committed: {
              label: "ملتزم",
              color: "hsl(var(--chart-1))",
            },
            notCommitted: {
              label: "غير ملتزم",
              color: "hsl(var(--chart-2))",
            },
          }}
          className='w-[60%] h-full'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              {" "}
              {/* Added margins */}
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={0}
                outerRadius={60}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#7C3AED" : "#FDB913"}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent labelKey='name' />}
                wrapperStyle={{ zIndex: 100, width: 80 }}
                // position={{ x: 0, y: 0 }}
                // labelClassName='font-bold'
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className='text-sm space-y-2'>
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center gap-2'>
              <div
                className={`w-3 h-3 rounded-full ${
                  index === 0 ? "bg-[#7C3AED]" : "bg-[#FDB913]"
                }`}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className='space-y-8'>
      {/* Radar Charts Section */}
      <h3 className={`${hidingOut} px-6`}>معدل اتقان المفاهيم ومكونات الدرس</h3>
      <div>
        <h3 className={`${hidingIn} mx-auto`}>
          معدل اتقان المفاهيم ومكونات الدرس
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 rtl'>
          {mockData.radarCharts.map((chart: any, index: number) => (
            <div key={index} className='p-4'>
              <h4 className='text-sm text-center mb-2 text-[#7C3AED]'>
                {chart.title}
              </h4>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <RadarChart
                    cx='50%'
                    cy='50%'
                    outerRadius='70%'
                    data={chart[chart.dataKey]}
                  >
                    <PolarGrid
                      stroke='#303947'
                      strokeWidth={0.3}
                      gridType='polygon'
                    />
                    <PolarAngleAxis
                      dataKey='subject'
                      stroke='#303947'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Radar
                      name={chart.title}
                      dataKey='value'
                      stroke='#7C3AED'
                      fill='#7C3AED'
                      fillOpacity={0.15}
                      strokeWidth={1}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Pie Charts */}
      <h3 className={`${hidingOut} px-6`}>تقارير الرؤية الحاسوبية</h3>
      <div>
        <h3 className={`${hidingIn} mx-auto`}>تقارير الرؤية الحاسوبية</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {renderPieChart(
            [
              {
                name: "متواجد",
                value:
                  charts?.concentration_percentage?.attentive_percentage || 0,
              },
              {
                name: "غير متواجد",
                value:
                  100 -
                  (charts?.concentration_percentage?.attentive_percentage || 0),
              },
            ],
            "معدل التواجد"
          )}
          {renderPieChart(
            [
              {
                name: "ملتزم",
                value:
                  charts?.concentration_percentage?.concentration_percentage ||
                  0,
              },
              {
                name: "غير ملتزم",
                value:
                  100 -
                  (charts?.concentration_percentage?.concentration_percentage ||
                    0),
              },
            ],
            "معدل الالتزام"
          )}
        </div>
      </div>
      <h3 className={`${hidingOut} px-6`}>التغذية الرجعية للأسألة المقالية</h3>
      <div className='container mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg'>
        <motion.table
          className='w-full border-collapse'
          dir='rtl'
          variants={tableVariants}
          initial='hidden'
          animate='visible'
        >
          <thead>
            <tr className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white'>
              <th className='p-3 text-right'>السؤال</th>
              <th className='p-3 text-right'>الإجابة الصحيحة</th>
              <th className='p-3 text-right'>إجابة الطالب</th>
              <th className='p-3 text-right'>التعليق</th>
            </tr>
          </thead>
          <tbody>
            {charts?.long_answer_questions_result_data?.map(
              (item: any, index: number) => (
                <>
                  <motion.tr
                    key={index}
                    variants={rowVariants}
                    className='border-b border-purple-200 hover:bg-purple-50 transition-colors duration-200'
                  >
                    <td className='p-3'>{item.question_text}</td>
                    <td className='p-3'>
                      <div className='flex items-center '>
                        <CheckCircle className='w-5 h-5 text-green-500 ml-2' />
                        {item.correct_answer}
                      </div>
                    </td>
                    <td className='p-3'>
                      <div className='flex items-center flex-1'>
                        {item.student_answer}
                      </div>
                    </td>
                    <td className='p-3'>
                      <div
                        className={
                          "bg-primary-100 border-r-4 border-primary-300 p-2 rounded"
                        }
                      >
                        {item.feedback}
                      </div>
                    </td>
                  </motion.tr>
                </>
              )
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
