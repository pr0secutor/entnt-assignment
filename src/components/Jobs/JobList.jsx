import { useContext, useState } from 'react';
import { JobsContext } from '../../contexts/JobsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { roleUtils } from '../../utils/roleUtils';

function JobList({ jobs: filteredJobs }) {
  const { jobs: allJobs, updateJob, deleteJob } = useContext(JobsContext);
  const { components } = useContext(ComponentsContext);
  const { user } = useContext(AuthContext);
  const jobs = filteredJobs || allJobs;
  const [filters, setFilters] = useState({ shipId: '', status: '', priority: '' });

  const filtered = jobs.filter(j => (
    (!filters.shipId || j.shipId === filters.shipId) &&
    (!filters.status || j.status === filters.status) &&
    (!filters.priority || j.priority === filters.priority)
  ));

  const handleStatusChange = (id, status) => {
    updateJob(id, { status });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Maintenance Jobs</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filters.shipId}
          onChange={(e) => setFilters({ ...filters, shipId: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Ships</option>
          {[...new Set(jobs.map(j => j.shipId))].map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-2xl w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Component</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Assigned Engineer</th>
              <th className="p-2 text-left">Scheduled Date</th>
              {roleUtils.canManageJobs(user?.role) && <th className="p-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(job => (
              <tr key={job.id} className="border-b">
                <td className="p-2">{components.find(c => c.id === job.componentId)?.name}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.priority}</td>
                <td className="p-2">
                  {roleUtils.canManageJobs(user?.role) ? (
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : job.status}
                </td>
                <td className="p-2">{job.assignedEngineerId}</td>
                <td className="p-2">{job.scheduledDate}</td>
                {roleUtils.canManageJobs(user?.role) && (
                  <td className="p-2">
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList;