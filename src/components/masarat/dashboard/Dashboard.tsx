// Note: You'll need to install recharts for the visualizations
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import HeadrsDashBoard from "./HeadrsDashBoard";
import StudentData from "./StudentData";
import ParentData from "./ParentData";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../config";
export default function Dashboard() {
  const [IsParent, setIsparent] = useState(false);
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState(null);


  const getDashboardData = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/users/student-dashboard/`,
        { parent_password: password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsError(false);
      setIsOpen(false);
      // setIsparent(true);
      await setChartData(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      setIsOpen(true);
      setIsError(true);
      return error; // Rethrow the error to prevent further execution if necessary
    }
  };

  useEffect(() => {
    getDashboardData();
    console.log(chartData);
  }, []);

  return (
    <div className='container mx-auto w-3/4 p-6 bg-slate-50 ' dir='rtl '>
      <HeadrsDashBoard
        getDahBoradData={getDashboardData}
        IsParent={IsParent}
        setPassword={setPassword}
        password={password}
        isError={isError}
        setIsError={setIsError}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setIsparent={setIsparent}
      />
      {!IsParent ? (
        <StudentData charts={chartData} />
      ) : (
        <>
          <StudentData charts={chartData} />
          <ParentData charts={chartData} />
        </>
      )}
    </div>
  );
}
