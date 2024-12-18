import * as d3 from "d3";

import { useEffect, useState } from "react";

export {
  useFetchWeeklyPerformanceData,
  useFetchTicketActivityData,
  useFetchCommunitymemberTrackerData,
  useFetchSupNerdsMemberInfoData,
};

// Fetch Suppport-Nerds member data with file name
import { avatars, domain, suffix } from "@/lib/avatars";

function useFetchSupNerdsMemberInfoData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    const newFormData = [];
    d3.csv(filename).then((d) => {
      d.forEach((each) => {
        let element = avatars.find((avatar) => avatar.id === each["Discord ID"]);
        if (element)
          newFormData.push({
            id: element.id,
            nickname: each["Discord name"],
            avatar: domain +element.id + "/" + element.hash + suffix,
            join_date: each["Start Date"],
            language: each["Active language"],
            role: each["Note"],
          });
      });
      setData(newFormData)
    });
  }, []);

  return data;
}

// Fetch and format Weekly performance data with file name
function useFetchWeeklyPerformanceData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv(filename).then((d) => {
      const newFormData = [];
      const performanceWeeks = d.columns.filter((column) =>
        column.includes("Weekly performance"),
      );

      d.forEach((each) => {
        let sum = 0;
        const tempData = [];

        for (const week of performanceWeeks) {
          sum += Number(each[week]);

          tempData.push({
            username: each["Discord name"].slice(0, 5),
            week: week,
            count: isNaN(Number(each[week])) ? 0 : Number(each[week]),
          });
        }

        if (sum !== 0) newFormData.push(...tempData);
      });

      newFormData.columns = ["username", "week", "count"];
      setData(newFormData);
    });
  }, []);

  return data;
}

// Fetch and format Ticket activity data with file name
function useFetchTicketActivityData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv(filename).then((d) => {
      const newFormData = [];
      const timePointsColums = d.columns.filter((column) =>
        column.includes("Total"),
      );
      const timePoints = timePointsColums.map((timePoint) =>
        timePoint.replace(/[\s, \n]/g, "").replace("Totalclosed-ticket", ""),
      );

      d.forEach((each) => {
        let sum = 0;
        const tempData = [];
        let duringName = "";
        let duringCount = 0;

        timePoints.forEach((timePoint, index) => {
          sum += duringCount;
          if (index < timePoints.length - 1) {
            duringName = `closed-ticket(${timePoint}-${timePoints[index + 1]})`;
            duringCount =
              Number(each[timePointsColums[index + 1]]) -
              Number(each[timePointsColums[index]]);
            duringCount = isNaN(duringCount) ? 0 : duringCount;
            tempData.push({
              username: each["Discord name"].slice(0, 5),
              week: duringName,
              count: duringCount,
            });
          }
        });

        if (sum !== 0) newFormData.push(...tempData);
      });
      newFormData.columns = ["username", "week", "count"];
      setData(newFormData);
    });
  }, []);

  return data;
}

// Fetch and format community-member-tracker data with file name
function useFetchCommunitymemberTrackerData(filename) {
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv(filename).then((d) => {
      const newFormData = [];
      const dateStringArray = d.columns.filter((column) => column !== "Data");
      const dateDateArray = dateStringArray.map((dateString) => {
        const year = new Date().getUTCFullYear(); // Get the current year in UTC
        const [monthString, day] = dateString.split("-");
        const month = new Date(Date.parse(`${monthString} 1`)).getMonth(); // Convert month name to month index (0-based)

        // Create a UTC date
        const date = new Date(Date.UTC(year, month, day));
        return date;
      });

      d.forEach((each) => {
        dateDateArray.forEach((date, index) => {
          newFormData.push({
            category: each.Data,
            date: date,
            count: Number(each[dateStringArray[index]]),
          });
        });
      });
      newFormData.tickets = dateDateArray;
      setData(newFormData);
    });
  }, []);

  return data;
}
