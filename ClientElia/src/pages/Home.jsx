// page d'acceuil // 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [users,setUsers]=useState([]);
  const [weeks,setWeeks]=useState([]);
  const [loggedUser,setLoggedUser] = useState({});
  const [days, setDays] = useState([]);

  // call api pour get les users
  const getUsers=()=>{
    fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Si tu utilises des cookies de session ou l'authentification
    })
    .then(response => response.json())
    .then(data => {
      setLoggedUser(data.find(u=>u.email==localStorage.getItem("email")))
      setUsers(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }

  // call api pour get les weeks
  const getWeeks=()=>{
    fetch('http://localhost:5000/api/weeks', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Si tu utilises des cookies de session ou l'authentification
    })
    .then(response => response.json())
    .then(data => {
      setWeeks(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }
  // Récupération des days
  const getDays = () => {
    fetch("http://localhost:5000/api/days", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDays(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  useEffect(() => {
    getUsers();
    getWeeks();
    getDays();
  }, []);
  
  // il faut convertur le format jour mmois année en anné mois et jour 
  function convertToISO(dateString) {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  }

  //clean la date
  const getCleanDate=(date)=>{
    const index = date.indexOf("T");  // Trouver l'index du "T"
    return date.slice(0, index);
  }

  //associe le nom du garde à l'id de la personne qui est de garde
  const getGuardName=(id)=>{
      const guard=users.find(user=>user._id==id);
      return guard?guard.firstName:"N/A";
  }

  const getReplacementNames=(week)=>{
    let replacements=[];
    week.day.forEach(d => {
      const day=days.find(e=>e._id==d);
      if(day){
        day.schedule.forEach(el=>{
          if(el.guard!=week.guard && !replacements.includes(getGuardName(el.guard))){
            replacements.push(getGuardName(el.guard))
          }
        });
      } 
    });
    return replacements
  }

  // gestion du click si elle est clique elle redirige vers la root week/{weekID}
  const handleWeekClick = (weekId) => {
    navigate(`/week/${weekId}`);
  };
  
  return (
    <div className="home-container">
    <header className="home-header">
        <div className="header-right">
          <div className="user-details">
            <span className="user-name">
              {loggedUser.firstName} {loggedUser.lastName}
            </span>
          </div>
         <img className="people" src="utilisateur.png"/>
        </div>
      </header>
      <div className="sector-title">
        <h1 className="user-zone-left">{loggedUser.zone}</h1>
        <h3 className="working-times">Working Times</h3>
      </div>
    <hr className="separator" />

      <div className="weeks-list">
        {weeks.map((week) => { // pour chauqe week on va faire la fonction 
          // Chercher l'utilisateur correspondant via son ID par la méthode find 
          const assignedUser=week.guard;
          // pour chacune de ses semaine il rend 
          const replacements = getReplacementNames(week); // Obtenir les remplaçants
          return (
            <div key={week._id} className="week-item-row">
              <div className="week-dates 1">
                <span>  {convertToISO(getCleanDate(week.startDate))} </span>
                <span>  {convertToISO(getCleanDate(week.endDate))}  </span>
              </div>
            
             
              <button
                className="week-item"
                onClick={() => handleWeekClick(week._id)}>
                   <span className="workingPeople">
              {getGuardName(assignedUser)}
                {replacements.length > 0 && (
                <span className="replacement-names">({replacements.join(", ")})</span>
              )}
              </span>
              </button>
          
            </div>
          );
        })}
      </div>

      {/*le baromètre */}
      <div className="barometer-container">
        <div className="barometer-title">Duty days done</div>
        <div className="barometer-value">{loggedUser.shiftsCompleted} / 100</div>
        <div className="barometer">
          <div
            className="barometer-fill"
            style={{
              width: `${(loggedUser.shiftsCompleted / 100) * 100}%`,
              backgroundColor: "#07cfbd",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;