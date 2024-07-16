"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useFetchWeeklyPerformanceData } from "@/utils/d3-fetch";

export default function WeeklyPerformance() {
  const titleName = "Message Activity"
  const weeklyPerformance = useFetchWeeklyPerformanceData("Support-Nerd.csv");
  if (weeklyPerformance) return <StackChart data={weeklyPerformance} title={titleName}/>;
}

function StackChart({ data, title }) {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 40;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  const ref = useRef(null);

  useEffect(() => {
    // Determine the series that need to be stacked.
    const series = d3
      .stack()
      .keys(d3.union(data.map((d) => d.week))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).count)(
      // get value for each series key and stack
      d3.index(
        data,
        (d) => d.username,
        (d) => d.week
      )
    ); // group by stack then series key

    // Prepare the scales for positional and color encodings.
    const x = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          (D) => -d3.sum(D, (d) => d.count),
          (d) => d.username
        )
      )
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .rangeRound([height - marginBottom, marginTop]);

    const color = d3
      .scaleOrdinal()
      .domain(series.map((d) => d.key))
      .range(d3.schemeSpectral[series.length])
      .unknown("#ccc");

    // A function to format the value in the tooltip.
    const formatValue = (x) => (isNaN(x) ? "0" : x.toLocaleString("en"));

    const svg = d3.select(ref.current);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);
    // Append a group for each series, and a rect for each element in the series.
    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((D) => D.map((d) => ((d.key = D.key), d)))
      .join("rect")
      .attr("x", (d) => x(d.data[0]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .append("title")
      .text(
        (d) =>
          `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).count)}`
      );

    // Append the horizontal axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g) => g.selectAll(".domain").remove());

    // Append the vertical axis.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call((g) => g.selectAll(".domain").remove());
  }, [ref]);

  // return Object.assign(svg.node(), {scales: {color}});
  return <svg ref={ref} width={width} height={height}></svg>;
}
