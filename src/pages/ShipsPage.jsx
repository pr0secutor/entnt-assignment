import { useContext, useState } from 'react';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import { AuthContext } from '../contexts/AuthContext';
import { roleUtils } from '../utils/roleUtils';

function ShipsPage() {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ships</h1>
      {roleUtils.canManageShips(user?.role) && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Close Form' : 'Add Ship'}
        </button>
      )}
      {showForm && <ShipForm onClose={() => setShowForm(false)} />}
      <ShipList />
    </div>
  );
}

export default ShipsPage;