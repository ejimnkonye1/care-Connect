import { useState } from "react";
import { StaffSign } from "./staffsign";
import { ParentSign } from "./parentsign";
import { AdminSign } from "./adminsign";

export const SignUps = () => {
  const [role, setRole] = useState(''); // initialize role state to an empty string
  const [btnloading, setbtnloading] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value); // update role state when user selects a new option
  };

  return (
    <section className="">
    <div className="container py-5 p-4 rounded-[14px]  bg-white space-y-6 dark:border-neutral-800 dark:bg-neutral-900">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        I am a:
      </label>
  
      <select
        className="mt-1 block lg:w-[30%] rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
        id="role"
        name="role"
        value={role}
        onChange={handleRoleChange}
      >
        <option value="parent">Parent</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
    </div>
      {role === 'admin' ? (
        <AdminSign
          btnloading={btnloading}
          setbtnloading={setbtnloading}
        />
      ) : role === 'staff' ? (
        <StaffSign
          btnloading={btnloading}
          setbtnloading={setbtnloading}
        />
      ) : (
        <ParentSign
          btnloading={btnloading}
          setbtnloading={setbtnloading}
        />
      )}
  
      <div className="mb-3 mt-2">
        <p className="mb-3 text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  </section>
  );
};