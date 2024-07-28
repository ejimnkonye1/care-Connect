import  { useState } from 'react';

const FeesList = () => {
  const [fees, setFees] = useState([
    { name: 'Enrollment Fee', amount: 100, status: 'Unpaid' },
    { name: 'Tuition Fee (Jan)', amount: 800, status: 'Unpaid' },
    { name: 'Care Fee (Jan)', amount: 500, status: 'Unpaid' },
    { name: 'Activity Fee (Jan)', amount: 200, status: 'Unpaid' },
    { name: 'Late Pick-up Fee (Jan 10)', amount: 20, status: 'Unpaid' },
  ]);

  const handlePay = (index) => {
    const newFees = [...fees];
    newFees[index].status = 'Paid';
    setFees(newFees);
  };

  return (
    <div className='card'>
  <table className="fees-list">

<thead>
  <tr>
    <th>Fee Name</th>
    <th>Fee Amount</th>
    <th>Status</th>
    <th>Pay Button</th>
  </tr>
</thead>
<tbody>
  {fees.map((fee, index) => (
    <tr key={index}>
      <td>{fee.name}</td>
      <td>${fee.amount}</td>
      <td>{fee.status}</td>
      <td>
        {fee.status === 'Unpaid' ? (
          <button onClick={() => handlePay(index)}>Pay Now</button>
        ) : (
          <span>Paid</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
</table>
    </div>
  
  );
};

export default FeesList;