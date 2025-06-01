import { createContext, useState, useContext } from 'react';
import { localStorageUtils } from '../utils/localStorageUtils';
import { NotificationsContext } from './NotificationsContext';

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(localStorageUtils.getData('jobs'));
  const { addNotification } = useContext(NotificationsContext);

  const addJob = (job) => {
    const newJob = { id: `j${jobs.length + 1}`, ...job };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorageUtils.setData('jobs', updatedJobs);
    addNotification(`Job ${newJob.type} created for component ${newJob.componentId}`);
  };

  const updateJob = (id, updatedJob) => {
    const updatedJobs = jobs.map(j => j.id === id ? { ...j, ...updatedJob } : j);
    setJobs(updatedJobs);
    localStorageUtils.setData('jobs', updatedJobs);
    addNotification(`Job ${id} updated to status ${updatedJob.status}`);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(j => j.id !== id);
    setJobs(updatedJobs);
    localStorageUtils.setData('jobs', updatedJobs);
    addNotification(`Job ${id} deleted`);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsProvider;