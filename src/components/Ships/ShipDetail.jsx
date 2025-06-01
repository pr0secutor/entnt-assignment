import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { roleUtils } from '../../utils/roleUtils';
import ShipForm from './ShipForm';
import ComponentList from '../Components/ComponentList';
import ComponentForm from '../Components/ComponentForm';
import JobList from '../Jobs/JobList';

function ShipDetail() {
  const { id } = useParams();
  const { ships } = useContext(ShipsContext);
  const { user } = useContext(AuthContext);
  const ship = ships.find(s => s.id === id);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showComponentForm, setShowComponentForm] = useState(false);

  if (!ship) {
    return <div className="p-6">Ship not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{ship.name}</h1>
      <div className="bg-white p-6 rounded shadow mb-6">
        <p><strong>IMO Number:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
        {roleUtils.canManageShips(user?.role) && (
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showEditForm ? 'Cancel Edit' : 'Edit Ship'}
          </button>
        )}
      </div>
      {showEditForm && roleUtils.canManageShips(user?.role) && (
        <ShipForm
          existingShip={ship}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {roleUtils.canManageComponents(user?.role) && (
        <div className="mb-6">
          <button
            onClick={() => setShowComponentForm(!showComponentForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showComponentForm ? 'Close Form' : 'Add Component'}
          </button>
        </div>
      )}
      {showComponentForm && <ComponentForm shipId={id} />}
      <ComponentList shipId={id} />
      <JobList shipId={id} />
    </div>
  );
}

export default ShipDetail;