import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useContext(AuthContext);
  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h4 className="text-2xl font-semibold text-gray-700">
                Create Account: Signup
              </h4>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSignup}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    type="text"
                    placeholder="Enter Your Name"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Enter Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    placeholder="Enter Your Email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Enter Your Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="text"
                    placeholder="Enter Your Password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Enter Your Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="submit"
                    value="Signup"
                    className="bg-pink-500 text-white rounded-md px-4 py-2 cursor-pointer"
                  />
                </div>
              </form>
              <div className="text-center mt-6 text-sm text-gray-600">
                <Link to="/" className="text-blue-500 hover:underline">
                  Already have an account? Login Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
