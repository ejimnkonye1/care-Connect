import pa from '../assets/pa.jpg';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';

const ProfileInfo = () => {
    return (
      <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Profile Picture Section */}
        <div className="flex flex-start items-center flex-row mb-6 border-slate-200 dark:border-neutral-800 border-b w-full">
  <img
    src={pa}
    alt="Profile"
    className="h-32 w-32 rounded-full object-cover mb-4"
  />
  <div className="flex flex-col pl-3">
    <button className="px-4 py-2 w-40 bg-emerald-500 text-white text-sm font-medium rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      Upload new photo
    </button>
    <p className="text-xs text-gray-500 mt-1">
      At least 800x800 px recommended. JPG or PNG is allowed.
    </p>
  </div>
</div>


  <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>

 
        {/* Parent Details Section */}
        <TableContainer className='mb-6 bg-gray-100 p-4 rounded-lg shadow-inner dark:bg-neutral-800'>
        <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Parent details
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          Edit
        </button>
      </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
             className='dark:text-neutral-100'
              >
                Full Name
              </TableCell>
              <TableCell
         className='dark:text-neutral-100'
              >
                Email
              </TableCell>
              <TableCell  className='dark:text-neutral-100'
              >
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='dark:text-neutral-100' >John Doe</TableCell>
              <TableCell   className='dark:text-neutral-100'>
                john.doe@example.com
              </TableCell>
              <TableCell  className='dark:text-neutral-100'>
                (123) 456-7890
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


      <TableContainer className='mb-6 bg-gray-100 p-4 rounded-lg shadow-inner dark:bg-neutral-800'>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child Details
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          Edit
        </button>
      </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
             className='dark:text-neutral-100'
              >
                Name
              </TableCell>
              <TableCell
         className='dark:text-neutral-100'
              >
                Age
              </TableCell>
              <TableCell  className='dark:text-neutral-100'
              >
                Gender
              </TableCell>
              <TableCell  className='dark:text-neutral-100'
              >
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='dark:text-neutral-100' >    Jane Doe</TableCell>
              <TableCell   className='dark:text-neutral-100 text-nowrap'>
                3 years
              </TableCell>
              <TableCell  className='dark:text-neutral-100'>
               Female
              </TableCell>
              <TableCell  className='dark:text-neutral-100'>
              1234 Elm St, Springfield, IL, 62704
              </TableCell>
           
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
        {/* Child Details Section */}
      
        </div>

        <form >
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">Company</label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
        disabled
        placeholder="Crech Connect."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Child Name</label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
        disabled
        placeholder="Child's Name"
      />
    </div>
  </div>
  
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Parent Email address</label>
    <input
      type="email"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
      disabled
      placeholder="example@email.com"
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">Parent First Name</label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="firstName"
        placeholder="Enter First Name"
        
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Parent Last Name</label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="lastName"
        placeholder="Enter Last Name"
       
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="address"
        placeholder="Enter Home Address"
     
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="number"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="phone"
        placeholder="Enter Phone Number"
        
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="gender"
     
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Age</label>
      <input
        type="number"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name="age"
        placeholder="Enter Age"
     
      />
    </div>
  </div>

  
</form>

      </div>
    );
  };
  


export default ProfileInfo;
