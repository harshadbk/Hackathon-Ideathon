import WelcomeSection from './WelcomeSection'
import QuickActionsSection from './QuickActionsSection'
import StatisticsSection from './StatisticsSection'
import RecentRequestsSection from './RecentRequestsSection'
import HelpSection from './HelpSection'
import FeaturesSection from './FeaturesSection'
import './CitizenDashboard.css'

export default function CitizenDashboard({ requests = [], onNew, onOpen, onTrack, user }) {
  return (
    <div className="dashboard-wrapper">
      <WelcomeSection user={user} />
      <QuickActionsSection onNew={onNew} onTrack={onTrack} />
      <StatisticsSection requests={requests} />
      <RecentRequestsSection requests={requests} onNew={onNew} onOpen={onOpen} />
      <HelpSection />
      <FeaturesSection />
    </div>
  )
}
