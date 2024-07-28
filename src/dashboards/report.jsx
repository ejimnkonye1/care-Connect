// IncidentReporting.js
import { useState } from 'react';

const incidentReports = [
  {
    date: '2023-02-20',
    time: '10:00 AM',
    location: 'Playground',
    description: 'Child fell and scraped knee',
  },
  {
    date: '2023-02-19',
    time: '3:00 PM',
    location: 'Classroom',
    description: 'Child had a seizure',
  },
];

const IncidentReporting = () => {
  const [newIncidentReport, setNewIncidentReport] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const handleAddIncidentReport = () => {
    incidentReports.push(newIncidentReport);
    setNewIncidentReport({
      date: '',
      time: '',
      location: '',
      description: '',
    });
  };

  return (
    <div>
      <h1>Incident Reporting</h1>
      <form>
        <label>Date:</label>
        <input type="date" value={newIncidentReport.date} onChange={(e) => setNewIncidentReport({ ...newIncidentReport, date: e.target.value })} />
        <br />
        <label>Time:</label>
        <input type="time" value={newIncidentReport.time} onChange={(e) => setNewIncidentReport({ ...newIncidentReport, time: e.target.value })} />
        <br />
        <label>Location:</label>
        <input type="text" value={newIncidentReport.location} onChange={(e) => setNewIncidentReport({ ...newIncidentReport, location: e.target.value })} />
        <br />
        <label>Description:</label>
        <textarea value={newIncidentReport.description} onChange={(e) => setNewIncidentReport({ ...newIncidentReport, description: e.target.value })} />
        <br />
        <button onClick={handleAddIncidentReport}>Add Incident Report</button>
      </form>
      <ul>
        {incidentReports.map((incidentReport, index) => (
          <li key={index}>
            <p>Date: {incidentReport.date}</p>
            <p>Time: {incidentReport.time}</p>
            <p>Location: {incidentReport.location}</p>
            <p>Description: {incidentReport.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentReporting;