import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { JobsContext } from "../../contexts/JobsContext";
import JobList from "./JobList";

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function JobCalendar() {
  const { jobs } = useContext(JobsContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jobsOnDate = jobs.filter((j) => {
    const jobDate = j.scheduledDate.split("T")[0];
    return jobDate === formatLocalDate(selectedDate);
  });

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Maintenance Calendar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const dateStr = formatLocalDate(date);
              const hasJobs = jobs.some((j) => {
                const jobDate = j.scheduledDate.split("T")[0];
                return jobDate === dateStr;
              });
              return hasJobs ? (
                <p className="text-red-500 font-bold">•</p>
              ) : null;
            }}
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            Jobs on {selectedDate.toDateString()}
          </h3>
          <JobList jobs={jobsOnDate} />
        </div>
      </div>
    </div>
  );
}

export default JobCalendar;