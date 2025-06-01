import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { JobsContext } from "../../contexts/JobsContext";
import JobList from "./JobList";

function JobCalendar() {
  const { jobs } = useContext(JobsContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jobsOnDate = jobs.filter(
    (j) => j.scheduledDate === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Maintenance Calendar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              const hasJobs = jobs.some((j) => j.scheduledDate === dateStr);
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
