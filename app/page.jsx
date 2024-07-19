import WeeklyPerformance from "@/charts/weekly-performance-stack-chart"
import CommunityMemberTracker from "@/charts/community-member-tracker-line-plot"
import SupNerds from "@/ui/support-nerds"

export default function Page() {
  return (
    <div>
      <WeeklyPerformance />
      <CommunityMemberTracker />
      <SupNerds />
    </div>
  )
}