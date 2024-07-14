import * as d3 from "d3"

import { useEffect,  useState } from "react";

export { useFetchWeeklyPerformanceData, }


// Fetch and format Weekly performance data with path
function useFetchWeeklyPerformanceData(path) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      d3.csv(path).then((d) => {
        const newFormData = [];
        const performanceWeeks = d.columns.filter(column => column.includes("Weekly performance"))
  
        d.forEach((each) => {
          let sum = 0
          const tempData = []
  
          for ( const  week of performanceWeeks) {
            sum += Number(each[week])
  
            tempData.push({
              username: each["Discord name"].slice(0, 5),
              week: week,
              count: Number(each[week]),
            });
          }
  
          if (sum !== 0)
            newFormData.push(...tempData)
        });
  
        newFormData.columns = ["username", "week", "count"];
        setData(newFormData);
      });
    }
    fetchData();
  }, []);
  
  return data
}
