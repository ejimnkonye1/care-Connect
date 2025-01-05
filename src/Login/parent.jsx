/* eslint-disable no-unused-vars */ 
/* eslint-disable react/prop-types */ 
/* eslint-disable react/no-unescaped-entities */ 
import { auth, firestore } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import pa from "../assets/h.png";

export const ParentLoginForm = ({
  setIsAdminLogin,
  setIsStaffLogin,
  btnloading,
  setbtnloading,
}) => {
  const handleAdminLogin = () => {
    setIsAdminLogin(true);
    setIsStaffLogin(false);
  };

  const handleStaffLogin = () => {
    setIsStaffLogin(true);
    setIsAdminLogin(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      const parentDoc = await getDoc(doc(firestore, "users", userId));
      if (parentDoc.exists()) {
        setbtnloading(true);
        setTimeout(() => {
          setbtnloading(false);
          navigate("/dash");
        }, 9000);
      } else {
        setError("You are not authorized as a parent.");
        setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
      setbtnloading(true);
      setTimeout(() => {
        setbtnloading(false);
        setError("Invalid email or password.");
        setTimeout(() => setError(""), 5000);
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="grid md:grid-cols-2 items-center gap-8 transition delay-150 duration-300 ease-in-out">
      <div className="max-md:order-1 lg:min-w-[450px] hidden lg:block md:block">
        <img src={pa} className="lg:w-11/12 w-full object-cover" alt="login-image" />
      </div>
      <form className="md:max-w-md w-full mx-auto" onSubmit={handleLogin}>
        <div className="">
          <h3 className="text-4xl font-extrabold text-blue-600">Sign in</h3>
        </div>
        <div className="flex justify-between mt-4 mb-12">
          <button
            type="button"
            className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none mr-2"
            onClick={handleStaffLogin}
          >
            Staff Login
          </button>
          <button
            type="button"
            className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none ml-2"
            onClick={handleAdminLogin}
          >
            Admin Login
          </button>
        </div>
        {error && (
          <div className="bg-yellow-300 text-center p-2 rounded mb-4">
            <span className="text-danger">{error}</span>
          </div>
        )}
        <div>
          <div className="relative flex items-center">
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="relative flex items-center">
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder="Enter password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
              viewBox="0 0 128 128"
              onClick={togglePasswordVisibility}
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
              Remember me
            </label>
          </div>
          <div>
            <a href="/resetpar" className="text-blue-600 font-semibold text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-12">
          <button
            type="submit"
            className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            {btnloading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="status"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
          <p className="text-gray-800 text-sm text-center mt-6">
            Don't have an account?
            <a
              href="signup"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
