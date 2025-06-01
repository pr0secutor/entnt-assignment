import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { ShipsContext } from "../../contexts/ShipsContext";
import { JobsContext } from "../../contexts/JobsContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Charts() {
  const { ships } = useContext(ShipsContext);
  const { jobs } = useContext(JobsContext);

  // Calculate ship status counts
  const statusCounts = ships.reduce((acc, ship) => {
    acc[ship.status] = (acc[ship.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate job status counts
  const jobStatusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  // Ship status pie chart configuration
  const shipStatusChart = {
    type: "pie",
    data: {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: "Ships by Status",
          data: Object.values(statusCounts),
          backgroundColor: ["#3b82f6", "#ef4444"], // Blue for Active, Red for Under Maintenance
          borderColor: ["#1e40af", "#b91c1c"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allow custom height
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Ship Status Distribution" },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
        datalabels: {
          color: "#fff", // White text for contrast
          font: { weight: "bold", size: 12 },
          formatter: (value) => value, // Display raw count
          anchor: "center", // Center the label in the segment
          align: "center",
        },
      },
    },
  };

  // Job status pie chart configuration
  const jobStatusChart = {
    type: "pie",
    data: {
      labels: Object.keys(jobStatusCounts),
      datasets: [
        {
          label: "Jobs by Status",
          data: Object.values(jobStatusCounts),
          backgroundColor: ["#3b82f6", "#ef4444", "#10b981"], // Blue for Open, Red for In Progress, Green for Completed
          borderColor: ["#1e40af", "#b91c1c", "#047857"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allow custom height
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Job Status Distribution" },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
        datalabels: {
          color: "#fff", // White text for contrast
          font: { weight: "bold", size: 12 },
          formatter: (value) => value, // Display raw count
          anchor: "center", // Center the label in the segment
          align: "center",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow w-full max-w-xs mx-auto">
        <div className="h-96">
          <h2 className="text-xl font-semibold">Ships</h2>
          <Pie data={shipStatusChart.data} options={shipStatusChart.options} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow w-full max-w-xs mx-auto">
        <div className="h-96">
          <h2 className="text-xl font-semibold">Jobs</h2>
          <Pie data={jobStatusChart.data} options={jobStatusChart.options} />
        </div>
      </div>
    </div>
  );
}

export default Charts;
