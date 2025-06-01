import { useState, useContext } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';

function ShipForm({ existingShip, onClose }) {
  const { addShip, updateShip } = useContext(ShipsContext);
  const [formData, setFormData] = useState(existingShip || { name: '', imo: '', flag: '', status: 'Active' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.imo || !formData.flag) {
      setError('All fields are required');
      return;
    }
    if (existingShip) {
      updateShip(existingShip.id, formData);
    } else {
      addShip(formData);
    }
    setFormData({ name: '', imo: '', flag: '', status: 'Active' });
    setError('');
    onClose();
  };

  return (
    <div className="max-w-md p-6 mb-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{existingShip ? 'Edit Ship' : 'Add Ship'}</h2>
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
          <label className="block text-sm font-medium">IMO Number</label>
          <input
            type="text"
            value={formData.imo}
            onChange={(e) => setFormData({ ...formData, imo: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Flag</label>
          <input
            type="text"
            value={formData.flag}
            onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {existingShip ? 'Update Ship' : 'Add Ship'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShipForm;