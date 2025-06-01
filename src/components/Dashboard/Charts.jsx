import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { ShipsContext } from '../../contexts/ShipsContext';
import { JobsContext } from '../../contexts/JobsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Charts() {
  const { ships } = useContext(ShipsContext);
  const { jobs } = useContext(JobsContext);

  const statusCounts = ships.reduce((acc, ship) => {
    acc[ship.status] = (acc[ship.status] || 0) + 1;
    return acc;
  }, {});

  const jobStatusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const shipStatusChart = {
    type: 'bar',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Ships by Status',
        data: Object.values(statusCounts),
        backgroundColor: ['#3b82f6', '#ef4444'],
        borderColor: ['#1e40af', '#b91c1c'],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Ship Status Distribution' },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Ships' },
        },
      },
    },
  };

  const jobStatusChart = {
    type: 'bar',
    data: {
      labels: Object.keys(jobStatusCounts),
      datasets: [{
        label: 'Jobs by Status',
        data: Object.values(jobStatusCounts),
        backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
        borderColor: ['#1e40af', '#b91c1c', '#047857'],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Job Status Distribution' },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Jobs' },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <Bar data={shipStatusChart.data} options={shipStatusChart.options} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={jobStatusChart.data} options={jobStatusChart.options} />
      </div>
    </div>
  );
}

export default Charts;