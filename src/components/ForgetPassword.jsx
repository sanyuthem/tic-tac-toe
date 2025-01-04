import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
export default function ForgetPassword() {
  const [email, setEmail] = useState();
  const { forgetPassword } = useContext(AuthContext);
  const forgetpass = (e) => {
    e.preventDefault();
    forgetPassword(email);
  };
  return (
    <div>
      <hr />
      <h4>Forget Password</h4>
      <form onSubmit={forgetpass}>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Enter Your Email"
        />
        <br />
        <input type="submit" />
      </form>

      <Link to="/"> Login Now</Link>
    </div>
  );
}
