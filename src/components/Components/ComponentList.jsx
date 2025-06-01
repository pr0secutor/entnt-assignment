import { useContext } from 'react';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { roleUtils } from '../../utils/roleUtils';

function ComponentList({ shipId }) {
  const { components, deleteComponent } = useContext(ComponentsContext);
  const { user } = useContext(AuthContext);
  const shipComponents = components.filter(c => c.shipId === shipId);

  return (
    <div className="bg-white p-6 rounded shadow w-full mb-4">
      <h2 className="text-2xl font-bold mb-4">Components</h2>
      <div className="overflow-x-auto">
        <table className="min-w-2xl w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Serial Number</th>
              <th className="p-2 text-left">Install Date</th>
              <th className="p-2 text-left">Last Maintenance</th>
              {roleUtils.canManageComponents(user?.role) && <th className="p-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {shipComponents.map(component => (
              <tr key={component.id} className="border-b">
                <td className="p-2">{component.name}</td>
                <td className="p-2">{component.serialNumber}</td>
                <td className="p-2">{component.installDate}</td>
                <td className="p-2">{component.lastMaintenanceDate}</td>
                {roleUtils.canManageComponents(user?.role) && (
                  <td className="p-2">
                    <button
                      onClick={() => deleteComponent(component.id)}
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

export default ComponentList;