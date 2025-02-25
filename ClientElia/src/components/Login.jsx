// formulaire de connexion 
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
// initaliser les espace vide
const [loggedUser,setLoggedUser]=useState(""); 
const [email , setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();// Hook pour naviguer entre les pages 

const logUser = async () => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: email,
          password: password
      })
  });

  const data = await response.json();

  if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email",email)
      navigate("/home");
  } else {
      console.error(data.error);
  }
};


// gerer les entrée du formulaire et ce qu'on fait quand on valide 
const handleSubmit = (e) => {
    e.preventDefault();
    logUser();
}



  return (
    <div className="login-container">
    <h1 className="title">Login</h1>
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="Entrer l'email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">PASSWORD</label>
      <input
        id="password"
        type="password"
        placeholder="Entrer le mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" type="submit">
        sign up
      </button>
    </form>
  </div>
);
}

export default Login
