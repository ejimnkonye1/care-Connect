
const Fee = [
    {
      name: "Tuition Fee",
      date: "Dec 15, 2024",
      amount: 80000,
      status: "Paid",
    },
    {
      name: "Feeding Fee",
      date: "Dec 15, 2024",
      amount: 150000,
      status: "Ongoing",
    },
    {
      name: "Late Pickup Fee",
      date: "Dec 14, 2024",
      amount: 87000,
      status: "Paid",
    },
    {
      name: "Stationery Fee",
      date: "Dec 14, 2024",
      amount: 100000,
      status: "Ongoing",
    },
    {
      name: "Medical Fee",
      date: "Dec 13, 2024",
      amount: 78000,
      status: "Paid",
      button: ''
    },
  ];
const Fees = () => {
  const handlePayClick = (name, amount) => {
    alert(`You selected to pay for: ${name} - $${amount}`);
    // Add payment logic here
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Fee Reminder
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Name
              </th>
              <th className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Amount
              </th>
              <th className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Status
              </th>
              <th className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Date
              </th>
              <th className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Fee.map((fee, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-neutral-800"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-neutral-300">
                  {fee.name}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-neutral-200">
                ₦{fee.amount.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-medium ${
                    fee.status === "Paid"
                      ? "text-emerald-400"
                      : "text-red-500"
                  }`}
                >
                  {fee.status}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-neutral-400">
                  {fee.date}
                </td>
                <td className="px-4 py-3">
  <button
    className={`rounded-lg px-4 py-2 text-sm font-medium text-white 
      ${fee.status === 'Paid' 
        ? 'bg-gray-400 cursor-not-allowed' // Style for disabled button
        : 'bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600'
      }`}
    onClick={() => handlePayClick(fee.name, fee.amount)}
    disabled={fee.status === 'Paid'}
  >
    Pay Now
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
