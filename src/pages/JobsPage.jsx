import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';
import JobCalendar from '../components/Jobs/JobCalendar';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { roleUtils } from '../utils/roleUtils';

function JobsPage() {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  if (!roleUtils.canViewJobs(user?.role)) {
    return <div className="p-6">Access Denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Maintenance Jobs</h1>
      {roleUtils.canManageJobs(user?.role) && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Close Form' : 'Add Job'}
        </button>
      )}
      {showForm && <JobForm />}
      <JobList />
      <JobCalendar />
      <NotificationCenter />
    </div>
  );
}

export default JobsPage;