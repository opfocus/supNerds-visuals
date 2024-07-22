"use client";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { CommunityDataItem, CommunityDataArray } from "@/lib/type";
import { Fragment } from "react";

import { useFetchCommunitymemberTrackerData } from "@/utils/d3-fetch";

export default function CommunityMemberTracker() {
  const titleName1 = "Discord-Member";
  const titleName2 = "Discord-weekly-activity";
  const data = useFetchCommunitymemberTrackerData(
    "Community-Member-Tracker.csv",
  ) as CommunityDataArray | undefined;

  if (data) {
    const discordMember = data
      .filter((e: any) => e.category === titleName1)
      .map((e: any) => ({
        date: e.date,
        count: e.count,
      }));
    const discordWeeklyActivity = data.filter(
      (e: any) => e.category === titleName2,
    );
    return (
      <Fragment>
        <CurveChart
          data={discordMember}
          title={titleName1}
          tickets={data.tickets}
        />
        <CurveChart
          data={discordWeeklyActivity}
          title={titleName2}
          tickets={data.tickets}
        />
      </Fragment>
    );
  }
}

function CurveChart({
  data,
  title,
  tickets,
}: {
  data: CommunityDataItem[];
  title: string;
  tickets: Date[];
}) {
  const ref = useRef<SVGSVGElement>(null);

  const width = 928;
  const height = 400;
  const marginTop = 40;
  const marginRight = 30;
  const marginBottom = 40;
  const marginLeft = 60;

  useEffect(() => {
    if (!ref.current) return;

    // X scale.
    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    // Y scale.
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.count) as number[])

      .nice()
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line<{ date: Date; count: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.count));
    // .curve(d3.curveCatmullRom.alpha(0.5));

    const svg = d3.select(ref.current);

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .text(title);

    // Add X-axis.
    const formatDate = d3.timeFormat("%b %d");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues(tickets) // Use the provided tickets array
          .tickFormat((d, i) => formatDate(d as Date)) // Format the ticks
          .tickSizeOuter(0),
      );

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Count ($)"),
      );
  }, []);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto my-8 h-auto max-w-full px-4 py-8 shadow-md hover:shadow-xl"
    ></svg>
  );
}
