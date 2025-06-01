import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShipsContext } from '../../contexts/ShipsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { JobsContext } from '../../contexts/JobsContext';
import ComponentList from '../Components/ComponentList';
import ComponentForm from '../Components/ComponentForm';
import JobList from '../Jobs/JobList';

function ShipDetail() {
  const { id } = useParams();
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);
  const ship = ships.find(s => s.id === id);

  if (!ship) return <div className="p-6">Ship not found</div>;

  const shipComponents = components.filter(c => c.shipId === id);
  const shipJobs = jobs.filter(j => j.shipId === id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{ship.name}</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">General Information</h3>
        <p><strong>IMO Number:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Components</h3>
        <ComponentList shipId={id} />
        <ComponentForm shipId={id} />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Maintenance History</h3>
        <JobList jobs={shipJobs} />
      </div>
    </div>
  );
}

export default ShipDetail;