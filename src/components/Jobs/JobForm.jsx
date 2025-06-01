import { useState, useContext } from 'react';
import { JobsContext } from '../../contexts/JobsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { ShipsContext } from '../../contexts/ShipsContext';
import { localStorageUtils } from '../../utils/localStorageUtils';

function JobForm() {
  const { addJob } = useContext(JobsContext);
  const { components } = useContext(ComponentsContext);
  const { ships } = useContext(ShipsContext);
  const engineers = localStorageUtils.getData('users').filter(u => u.role === 'Engineer');
  const [formData, setFormData] = useState({
    shipId: '',
    componentId: '',
    type: '',
    priority: 'Medium',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: ''
  });
  const [error, setError] = useState('');

  const shipComponents = formData.shipId
    ? components.filter(c => c.shipId === formData.shipId)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shipId || !formData.componentId || !formData.type || !formData.assignedEngineerId || !formData.scheduledDate) {
      setError('All fields are required');
      return;
    }
    addJob(formData);
    setFormData({
      shipId: '',
      componentId: '',
      type: '',
      priority: 'Medium',
      status: 'Open',
      assignedEngineerId: '',
      scheduledDate: ''
    });
    setError('');
  };

  return (
    <div className="max-w-md mb-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Maintenance Job</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Ship</label>
          <select
            value={formData.shipId}
            onChange={(e) => setFormData({ ...formData, shipId: e.target.value, componentId: '' })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Ship</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Component</label>
          <select
            value={formData.componentId}
            onChange={(e) => setFormData({ ...formData, componentId: e.target.value })}
            className="w-full p-2 border rounded"
            required
            disabled={!formData.shipId}
          >
            <option value="">Select Component</option>
            {shipComponents.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Assigned Engineer</label>
          <select
            value={formData.assignedEngineerId}
            onChange={(e) => setFormData({ ...formData, assignedEngineerId: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Engineer</option>
            {engineers.map(e => (
              <option key={e.id} value={e.id}>{e.email}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Scheduled Date</label>
          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Job
        </button>
      </form>
    </div>
  );
}

export default JobForm;