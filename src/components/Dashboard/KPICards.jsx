import { useContext } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { JobsContext } from '../../contexts/JobsContext';

function KPICards() {
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const overdueComponents = components.filter(c => {
    const lastMaintenance = new Date(c.lastMaintenanceDate);
    const now = new Date();
    const diffYears = (now - lastMaintenance) / (1000 * 60 * 60 * 24 * 365);
    return diffYears > 1; // Assume maintenance due yearly
  });

  const jobsInProgress = jobs.filter(j => j.status === 'In Progress').length;
  const jobsCompleted = jobs.filter(j => j.status === 'Completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Ships</h3>
        <p className="text-2xl">{ships.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Overdue Maintenance</h3>
        <p className="text-2xl">{overdueComponents.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Jobs In Progress</h3>
        <p className="text-2xl">{jobsInProgress}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Jobs Completed</h3>
        <p className="text-2xl">{jobsCompleted}</p>
      </div>
    </div>
  );
}

export default KPICards;