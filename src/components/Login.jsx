import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { auth, googleAuthProvider } from "../firebase"; // Import Google Auth provider
import { signInWithPopup } from "firebase/auth"; // Firebase Google login function

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useContext(AuthContext); // Access login and loginWithGoogle functions

  // Email/Password Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password); // Using the login from context
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Using the Google login from context
    } catch (error) {
      console.error("Error during Google Login:", error.message);
    }
  };

  return (
    <div className=" py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h4 className="text-2xl font-bold font-sans text-purple-500">Login To Your Account</h4>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    placeholder="Enter Your Email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Enter Your Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    placeholder="Enter Your Password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Enter Your Password
                  </label>
                </div>
                <Link to="/forget-password" className="text-blue-500 hover:underline text-center mt-6 text-sm">Forgot Password?</Link>
                <div className="relative">
                  <input type="submit" value="Login" className="bg-cyan-400 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-blue-400" />
                </div>
              </form>
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center font-bold font-serif bg-gradient-to-r from-blue-300 to-purple-500 animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium *: mt-3 px-4 py-2 rounded-lg tracking-wide"
                >
                  <svg className="h- w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <g>
                      <path fill="#FBBC05" d="M9.827 24C9.827 22.476 10.08 21.014 10.532 19.644L2.623 13.604C1.082 16.734 0.214 20.26 0.214 24C0.214 27.737 1.081 31.261 2.62 34.388L10.525 28.337C10.077 26.973 9.827 25.517 9.827 24Z" />
                      <path fill="#EB4335" d="M23.714 10.133C27.025 10.133 30.016 11.307 32.366 13.227L39.202 6.4C35.036 2.773 29.695 0.533 23.714 0.533C14.427 0.533 6.445 5.844 2.623 13.604L10.532 19.644C12.355 14.112 17.549 10.133 23.714 10.133Z" />
                      <path fill="#34A853" d="M23.714 37.867C17.549 37.867 12.355 33.888 10.532 28.356L2.623 34.395C6.445 42.156 14.427 47.467 23.714 47.467C29.446 47.467 34.918 45.431 39.025 41.618L31.518 35.814C29.4 37.149 26.732 37.867 23.714 37.867Z" />
                      <path fill="#4285F4" d="M46.145 24C46.145 22.613 45.932 21.12 45.611 19.733H23.714V28.8H36.318C35.688 31.891 33.973 34.268 31.518 35.814L39.025 41.618C43.339 37.614 46.145 31.649 46.145 24Z" />
                    </g>
                  </svg>
                  <span>Login with Google</span>
                </button>
              </div>
              <div className="">
                <Link to="/signup" className="text-blue-500 hover:underline">Don't have an account? Signup Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
