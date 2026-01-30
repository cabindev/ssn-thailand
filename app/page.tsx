import { getDashboard } from '@/lib/api';
import HeroSection from '@/components/home/HeroSection';
import StatsCards from '@/components/home/StatsCards';
import TimelinesSection from '@/components/home/TimelinesSection';
import ChartsSection from '@/components/home/ChartsSection';
import RecentItems from '@/components/home/RecentItems';
import FeaturesSection from '@/components/home/FeaturesSection';
import { Dashboard } from '@/types';

// Force dynamic rendering - fetch data on every request
export const dynamic = 'force-dynamic';

// Default empty dashboard when API is not available
const emptyDashboard: Dashboard = {
  stats: {
    creative_activities_count: 0,
    traditions_count: 0,
    ethnic_groups_count: 0,
    public_policies_count: 0,
    total_count: 0,
  },
  charts: {
    creative_activities_by_region: [],
    traditions_by_region: [],
    ethnic_groups_by_region: [],
    public_policies_by_level: [],
  },
  recent: {
    creative_activities: [],
    traditions: [],
    ethnic_groups: [],
    public_policies: [],
  },
};

export default async function HomePage() {
  let dashboard: Dashboard;

  try {
    dashboard = await getDashboard();
  } catch (error) {
    console.error('Failed to fetch dashboard:', error);
    dashboard = emptyDashboard;
  }

  return (
    <div>
      <HeroSection />
      <StatsCards stats={dashboard.stats} />
      <TimelinesSection
        activities={dashboard.recent.creative_activities}
        policies={dashboard.recent.public_policies}
      />
      <ChartsSection charts={dashboard.charts} />
      <RecentItems
        creativeActivities={dashboard.recent.creative_activities}
        traditions={dashboard.recent.traditions}
        ethnicGroups={dashboard.recent.ethnic_groups}
        publicPolicies={dashboard.recent.public_policies}
      />
      <FeaturesSection />
    </div>
  );
}
