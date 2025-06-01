import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { ShipsContext } from "../../contexts/ShipsContext";
import { JobsContext } from "../../contexts/JobsContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
    type: "pie",
    data: {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: "Ships by Status",
          data: Object.values(statusCounts),
          backgroundColor: ["#3b82f6", "#ef4444"],
          borderColor: ["#1e40af", "#b91c1c"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          color: "#fff",
          font: { weight: "bold", size: 12 },
          formatter: (value) => value,
          anchor: "center",
          align: "center",
        },
      },
    },
  };

  const jobStatusChart = {
    type: "pie",
    data: {
      labels: Object.keys(jobStatusCounts),
      datasets: [
        {
          label: "Jobs by Status",
          data: Object.values(jobStatusCounts),
          backgroundColor: ["#3b82f6", "#ef4444", "#10b981"],
          borderColor: ["#1e40af", "#b91c1c", "#047857"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          color: "#fff",
          font: { weight: "bold", size: 12 },
          formatter: (value) => value,
          anchor: "center",
          align: "center",
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="bg-white flex-1 p-4 rounded shadow w-full">
        <div className="h-96 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Ships</h2>
          <div className="flex-1 relative">
            <Pie
              data={shipStatusChart.data}
              options={shipStatusChart.options}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="bg-white flex-1 p-4 rounded shadow w-full">
        <div className="h-96 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Jobs</h2>
          <div className="flex-1 relative">
            <Pie
              data={jobStatusChart.data}
              options={jobStatusChart.options}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
