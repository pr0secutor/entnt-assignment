import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import NotificationCenter from '../components/Notifications/NotificationCenter';

function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <KPICards />
      <Charts />
      <NotificationCenter />
    </div>
  );
}

export default DashboardPage;