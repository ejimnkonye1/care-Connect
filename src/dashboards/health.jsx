// HealthAndSafetyForm.js
import { useState } from 'react';

const HealthAndSafetyForm = () => {
  const [childInfo, setChildInfo] = useState({
    name: '',
    allergies: '',
    medicalConditions: '',
    incidentReports: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save child info to database or API
    console.log(childInfo);
  };

  return (
    <div>
      <h1>Health and Safety Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={childInfo.name}
            onChange={(e) => setChildInfo({ ...childInfo, name: e.target.value })}
          />
        </label>
        <label>
          Allergies:
          <input
            type="text"
            value={childInfo.allergies}
            onChange={(e) => setChildInfo({ ...childInfo, allergies: e.target.value })}
          />
        </label>
        <label>
          Medical Conditions:
          <input
            type="text"
            value={childInfo.medicalConditions}
            onChange={(e) => setChildInfo({ ...childInfo, medicalConditions: e.target.value })}
          />
        </label>
        <label>
          Incident Reports:
          <textarea
            value={childInfo.incidentReports}
            onChange={(e) => setChildInfo({ ...childInfo, incidentReports: e.target.value })}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthAndSafetyForm;