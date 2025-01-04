import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase"; // Import Google Auth provider
export const AuthContext = createContext(null);
import { useNavigate } from "react-router-dom";

export default function AuthContextProviderMain({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Email/Password Login
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;

        if (user.emailVerified === false) {
          alert("Please verify your account to use the app.");
        } else {
          setUser({ email: user.email, name: user.displayName });
          localStorage.setItem(
            "user",
            JSON.stringify({ email: user.email, name: user.displayName })
          );
          navigate("/home");
        }
      })
      .catch((err) => alert(err.message));
  };

  // Google Login
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        setUser({ email: user.email, name: user.displayName });
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, name: user.displayName })
        );
        navigate("/home");
      })
      .catch((err) => alert(`Google Login Error: ${err.message}`));
  };

  // Sign Up
  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;

        sendEmailVerification(user, {
          url: "http://localhost:5173/",
        }).then(() =>
          alert("Please activate your account using the link sent to your email.")
        );
      })
      .catch((err) => alert(err.message));
  };

  // Forgot Password
  const forgetPassword = (email) => {
    sendPasswordResetEmail(auth, email, {
      url: "http://localhost:5173/",
    })
      .then(() => alert("Password reset link sent to your email."))
      .catch((err) => alert(err.message));
  };

  // Automatically log in if user exists in localStorage
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/home");
    }
  }, []);

  // Logout
  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        forgetPassword,
        logout,
        loginWithGoogle, // Added Google Login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}