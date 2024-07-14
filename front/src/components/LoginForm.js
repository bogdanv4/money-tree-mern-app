import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
// import users from "../data/users";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const signUser = await axios.post("/api/signin", { email, password });
      console.log(signUser);
      if ((signUser.data.success = true)) {
        setEmail("");
        setPassword("");
        navigate("/app");
        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(signUser.data));
        }
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email and/or password");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="last-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <div className="checkbox">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <Button className={"link-btn right"}>Forgot password? </Button>
      </div> */}

      <Button className={"submit-btn"} onClick={handleLogin}>
        Sign in
      </Button>

      <Link to={"/register"}>
        <Button className={"link-btn left"}>Create an account </Button>
      </Link>
    </form>
  );
}
