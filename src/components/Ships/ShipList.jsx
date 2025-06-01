import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShipsContext } from '../../contexts/ShipsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { roleUtils } from '../../utils/roleUtils';

function ShipList() {
  const { ships, deleteShip } = useContext(ShipsContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Ships</h2>
      <div className="overflow-x-auto">
        <table className="min-w-2xl w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">IMO Number</th>
              <th className="p-2 text-left">Flag</th>
              <th className="p-2 text-left">Status</th>
              {roleUtils.canManageShips(user?.role) && <th className="p-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {ships.map(ship => (
              <tr key={ship.id} className="border-b">
                <td className="p-2"><Link to={`/ships/${ship.id}`} className="text-blue-600 hover:underline">{ship.name}</Link></td>
                <td className="p-2">{ship.imo}</td>
                <td className="p-2">{ship.flag}</td>
                <td className="p-2">{ship.status}</td>
                {roleUtils.canManageShips(user?.role) && (
                  <td className="p-2">
                    <button
                      onClick={() => deleteShip(ship.id)}
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

export default ShipList;