import StackChart from "@/charts/weekly-performance-stack-chart"
import Home from "@/charts/community-member-tracker-line-plot"

export default function Page() {
  return (
    <div>
      <StackChart />
      <Home />
    </div>
  )
}