import { useState, useContext } from 'react';
import { ComponentsContext } from '../../contexts/ComponentsContext';

function ComponentForm({ shipId }) {
  const { addComponent } = useContext(ComponentsContext);
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.serialNumber || !formData.installDate) {
      setError('All fields are required');
      return;
    }
    addComponent({ ...formData, shipId });
    setFormData({ name: '', serialNumber: '', installDate: '', lastMaintenanceDate: '' });
    setError('');
  };

  return (
    <div className="max-w-md mx-auto my-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Component</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Serial Number</label>
          <input
            type="text"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Install Date</label>
          <input
            type="date"
            value={formData.installDate}
            onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Maintenance Date</label>
          <input
            type="date"
            value={formData.lastMaintenanceDate}
            onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Component
        </button>
      </form>
    </div>
  );
}

export default ComponentForm;