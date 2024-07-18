import { ChangeEvent, useState, FormEvent } from "react";
import logo from "../images/logo.jpeg";

import songsService from "../apis/services/songs.service";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await songsService.login({
        username,
        password,
      });

      if (response.status === 200) {
        setLoggedIn(true);
        localStorage.getItem('userId')
        localStorage.setItem("token", response.data.accessToken);

        navigate("/welcome");
      } else {
        setErrorMsg("Incorrect username or password");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "120px" }}>
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src={logo}
          alt="logo"
          style={{ width: "40px", height: "40px" }}
        />
        <h2 className="h3 mb-3 fw-normal">Please sign in</h2>

        <div>
          <input
            type="username"
            id="floatingInput"
            placeholder="username"
            value={username}
            onChange={handleUsername}
          />
        </div>

        <div>
          <input
            type="password"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Sign in
        </button>
        {errorMsg && <p style={{ color: "red" }}> {errorMsg}</p>}
      </form>
    </div>
  );
}
