// formulaire de connexion 
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
// initaliser les espace vide 
const [name , setName] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();// Hook pour naviguer entre les pages 

// gerer les entrée du formulaire et ce qu'on fait quand on valide 
const handleSubmit = (e) => {
    e.preventDefault();

    // voir si les données correspondent il faudra changer avec les données de la base de donnés 
if (name === "Jiara Martins" && password === "123456") {
        // Si c'est correct, on redirige vers la page d'accueil
    navigate("/home");
      } else {
        alert("Nom ou mot de passe incorrect.");
      }
    };


  return (
    <div className="login-container">
    <h1 className="title">Login</h1>
    <span className="subtitle">sign in</span>

    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="name">NAME</label>
      <input
        id="name"
        type="text"
        placeholder="Entrer le nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
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
