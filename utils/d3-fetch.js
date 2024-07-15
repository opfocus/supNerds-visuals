import * as d3 from "d3";

import { useEffect, useState } from "react";

export { useFetchWeeklyPerformanceData, useFetchCommunitymemberTrackerData };

// Fetch and format Weekly performance data with file name
function useFetchWeeklyPerformanceData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      d3.csv(filename).then((d) => {
        const newFormData = [];
        const performanceWeeks = d.columns.filter((column) =>
          column.includes("Weekly performance")
        );

        d.forEach((each) => {
          let sum = 0;
          const tempData = [];

          for (const week of performanceWeeks) {
            sum += Number(each[week]);

            tempData.push({
              username: each["Discord name"].slice(0, 5),
              week: week,
              count: Number(each[week]),
            });
          }

          if (sum !== 0) newFormData.push(...tempData);
        });

        newFormData.columns = ["username", "week", "count"];
        setData(newFormData);
      });
    }
    fetchData();
  }, []);

  return data;
}

// Fetch and format community-member-tracker data with file name
function useFetchCommunitymemberTrackerData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      d3.csv(filename).then((d) => {
        const newFormData = [];
        const dateStringArray = d.columns
          .filter((column) => column !== "Data")
        const dateDateArray = dateStringArray .map((dateString) => {
            const year = new Date().getFullYear(); // Get the current year
            const fullDateString = `${dateString}-${year}`; // Append the year to the date string
            const date = new Date(fullDateString);
            return date;
          });

        d.forEach((each) => {
          dateDateArray.forEach(( date, index) => {
            newFormData.push({
              category: each.Data,
              date: date,
              count: Number(each[dateStringArray[index]]),
            });
          })
        });

        setData(newFormData);
      });
    }
    fetchData();
  }, []);

  return data;
}
