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

export default function ParentData({ charts }: { charts: any }) {
  const hidingOut =
    "text-center font-semibold bg-primary-300 text-white w-fit my-4 rounded-2xl px-2 py-1 mx-auto";
  const hidingIn =
    "text-center text-texm font-medium mt-4 bg-primary-100 text-primary-300 w-fit rounded-2xl px-2 py-1";

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
          {
            subject: "تحدي",
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
          <div className='p-4'>
            <h4 className='text-sm text-center mb-4 text-[#7C3AED]'>
              معدل التواجد
            </h4>
            <div className='h-[150px] flex items-center justify-center'>
              <ResponsiveContainer width='60%' height='100%'>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "متواجد",
                        value: mockData.attendanceData.present,
                      },
                      {
                        name: "غير متواجد",
                        value: mockData.attendanceData.absent,
                      },
                    ]}
                    dataKey='value'
                    innerRadius={0}
                    outerRadius={60}
                  >
                    <Cell fill='#7C3AED' />
                    <Cell fill='#FDB913' />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='text-sm space-y-2'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-[#7C3AED]' />
                  <span>متواجد</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-[#FDB913]' />
                  <span>غير متواجد</span>
                </div>
              </div>
            </div>
          </div>

          <div className='p-4'>
            <h4 className='text-sm text-center mb-4 text-[#7C3AED]'>
              معدل الالتزام
            </h4>
            <div className='h-[150px] flex items-center justify-center'>
              <ResponsiveContainer width='60%' height='100%'>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "ملتزم",
                        value: mockData.commitmentData.committed,
                      },
                      {
                        name: "غير ملتزم",
                        value: mockData.commitmentData.notCommitted,
                      },
                    ]}
                    dataKey='value'
                    innerRadius={0}
                    outerRadius={60}
                  >
                    <Cell fill='#7C3AED' />
                    <Cell fill='#FDB913' />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='text-sm space-y-2'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-[#7C3AED]' />
                  <span>ملتزم</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-[#FDB913]' />
                  <span>غير ملتزم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
