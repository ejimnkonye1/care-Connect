
const Fee = [
    {
      name: "Tuition Fee",
      date: "Nov 15, 2023",
      amount: 80000,
      status: "Paid",
    },
    {
      name: "Feeding Fee",
      date: "Nov 15, 2023",
      amount: 150000,
      status: "Ongoing",
    },
    {
      name: "Late Pickup Fee",
      date: "Nov 14, 2023",
      amount: 87000,
      status: "Paid",
    },
    {
      name: "Stationery Fee",
      date: "Nov 14, 2023",
      amount: 100000,
      status: "Ongoing",
    },
    {
      name: "Medical Fee",
      date: "Nov 13, 2023",
      amount: 78000,
      status: "Paid",
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
                  ${fee.amount.toLocaleString()}
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
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600"
        onClick={() => handlePayClick(fee.name,fee.amount)}
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
