import WeeklyPerformance from "@/charts/weekly-performance-stack-chart"
import CommunityMemberTracker from "@/charts/community-member-tracker-line-plot"

export default function Page() {
  return (
    <div>
      <WeeklyPerformance />
      <CommunityMemberTracker />
    </div>
  )
}