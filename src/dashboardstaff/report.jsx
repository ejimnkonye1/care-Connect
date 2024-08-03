import { addDoc, collection,  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";


export const StaffReport = () => {
    const [users, setUser] = useState([])
    const [selectedChildName, setSelectedChildName] = useState('')
    const [selectedUserId, setSelectedUserId] = useState(''); 
  const [incidentReports, setIncidentReports] = useState([]);
  const [newIncidentReport, setNewIncidentReport] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
    childName:'',
    userId : ''
  });

useEffect(() => {
const fetchUsers = async () => {
    const usersRef = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersRef)
    const usersData = usersSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
    setUser(usersData)
}
fetchUsers();
}, [])





  const handleAddIncidentReport =  async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!newIncidentReport.date || !newIncidentReport.location ||
        !newIncidentReport.time || !newIncidentReport.description 
        ||
        !newIncidentReport.userId || !newIncidentReport.childName
    ){
        alert('Please fill in all required fields')
        return;
    }
    try{
        const incidentReportRef = collection(firestore, 'incidentReport')
        await addDoc(incidentReportRef, newIncidentReport)
        setIncidentReports((prevUpdates) => [...prevUpdates, newIncidentReport])    
        setNewIncidentReport({
        date: '',
        time: '',
        location: '',
        description: '',
        childName:'',
        userId:''
      });
    } catch (error){
        console.error("Erro sending incident Report", error)
    }
  
  };

  const handleChildChange = (e) => {
    const childName = e.target.value;
    const user = users.find(user => user.children.some(child => child.name === childName))
    if (user) {
        setSelectedChildName(childName)
        setSelectedUserId(user.id)
        setNewIncidentReport((prevUpdate) => ({
            ...prevUpdate,
            childName,
            userId :user.id
        }))
    }
  }
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Incident Reporting</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={newIncidentReport.date}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Time:</label>
          <input
            type="time"
            id="time"
            className="form-control"
            value={newIncidentReport.time}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, time: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={newIncidentReport.location}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, location: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={newIncidentReport.description}
            onChange={(e) => setNewIncidentReport({ ...newIncidentReport, description: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAddIncidentReport}
        >
          Add Incident Report
        </button>
      </form>

<div>
    <select
    name="childId"
    value={newIncidentReport.childId}
    onChange={handleChildChange}
    className="mt-4">
{users.map((user, index) => (
user.children ?(
    user.children.map((child, childIndex) => (
        <option key={`${index}-${childIndex}`} value={child.id}>
            {child.name}
        </option>

))
) :(
    <option key={index} value='' disabled>
            No children data available
        </option>
)
))}
        
    </select>

</div>
      <div className="mt-4">
        <h2>Incident History</h2>
        <div className="list-group">
          {incidentReports.map((report, index) => (
            <div key={index} className="list-group-item">
              <h5 className="mb-1">Date: {report.date}</h5>
              <p className="mb-1">Time: {report.time}</p>
              <p className="mb-1">Location: {report.location}</p>
              <p className="mb-1">Description: {report.description}</p>
              <p className="mb-1">Type: {report.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
