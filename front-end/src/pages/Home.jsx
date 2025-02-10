// page d'acceuil // 
import React from "react";
import { useNavigate } from "react-router-dom";
import { mockWeeks, mockUsers } from "../components/mokWeek";// importe la fausse base de données
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  
  const mainUser = mockUsers[0];
  const remainingGuards = mainUser.guardPerDays; // ex. 10

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
              {mainUser.firstName} {mainUser.lastName}
            </span>
          </div>
          <img src="../image/utilisateur.png"
          />
        </div>
      </header>
      <div className="sector-title">
        <h1 className="user-zone-left">{mainUser.zone}</h1>
        <h3 className="working-times">Working Times</h3>
      </div>
    <hr className="separator" />

      <div className="weeks-list">
        {mockWeeks.map((week) => { // pour chauqe week on va faire la fonction 
          // Chercher l'utilisateur correspondant via son ID par la méthode find 
          const assignedUser = mockUsers.find(user => user._id === week.assignedUserId);
          // pour chacune de ses semaine il rend 
          return (
            <div key={week._id} className="week-item-row">
              <span className="week-dates">
                {week.startWeek} to {week.endWeek} :
              </span>
              <button
                className="week-item"
                style={{ backgroundColor: assignedUser?.color || "#000" }}
                onClick={() => handleWeekClick(week._id)}
              >
                {assignedUser ? assignedUser.firstName : "N/A"}
              </button>
            </div>
          );
        })}
      </div>

      {/*le baromètre */}
      <div className="barometer-container">
        <div className="barometer-title">Gardes restantes</div>
        <div className="barometer-value">{remainingGuards} / 100</div>
        <div className="barometer">
          <div
            className="barometer-fill"
            style={{
              width: `${(remainingGuards / 100) * 100}%`,
              backgroundColor: mainUser.color,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;