// MedicalAlertSystem.js
import { useState } from 'react';

const medicalProfiles = {
  'child-1': {
    medicalHistory: 'Asthma',
    allergies: 'Peanuts',
    specialNeeds: 'None',
  },
  'child-2': {
    medicalHistory: 'Diabetes',
    allergies: 'Gluten',
    specialNeeds: 'None',
  },
  'child-3': {
    medicalHistory: 'None',
    allergies: 'None',
    specialNeeds: 'Autism',
  },
};

const MedicalAlertSystem = () => {
  const [alerts, setAlerts] = useState([]);

  const handleSendAlert = (childId) => {
    const medicalProfile = medicalProfiles[childId];
    if (medicalProfile.allergies) {
      setAlerts((prevAlerts) => [...prevAlerts, `Allergy Alert: ${medicalProfile.allergies}`]);
    } else if (medicalProfile.medicalHistory) {
      setAlerts((prevAlerts) => [...prevAlerts, `Medical Alert: ${medicalProfile.medicalHistory}`]);
    }
  };

  return (
    <div>
      <h1>Medical Alert System</h1>
      <ul>
        {Object.keys(medicalProfiles).map((childId) => (
          <li key={childId}>
            <p>Child ID: {childId}</p>
            <p>Medical History: {medicalProfiles[childId].medicalHistory}</p>
            <p>Allergies: {medicalProfiles[childId].allergies}</p>
            <p>Special Needs: {medicalProfiles[childId].specialNeeds}</p>
            <button onClick={() => handleSendAlert(childId)}>Send Alert</button>
          </li>
        ))}
      </ul>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalAlertSystem;