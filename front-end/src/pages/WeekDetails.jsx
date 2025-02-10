import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockWeeks, mockDays, mockUsers } from "../components/mokWeek";
import "./WeekDetail.css";

// il faut convertur le format jour mmois année en anné mois et jour 
function convertToISO(dateString) {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}

// retournée la date en jour 
function getDayName(dateString) {
  const isoString = convertToISO(dateString); // va rechercher la date dans le bon format 
  const date = new Date(isoString);
  const options = { weekday: "long" }; // long indique que pour le format date on veut le fromat long de son nom Lundi et pas lun 
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
  // Intl.DateTimeFormat = API JS pour formater des date en langues FR en entier appliquer a la date 
}

function WeekDetail() {
  const { id } = useParams(); // ID de la semaine (par ex. "week1")
  const navigate = useNavigate();

  // Recherche les semaines 
  const week = mockWeeks.find((weekItem) => weekItem._id === id); // pour chaque semaine trouver dans le mock
  if (!week) {
    return <div>La semaine n'a pas été trouvée.</div>; // message si on ne trouve pas la semaine 
  }

  // récupérer les jours de la Week 
  const daysForWeek = week.days.map((dayId) => // parcours l'array day dans week 
    mockDays.find((day) => day._id === dayId) // il va regarder que chaque day dans week soit retrouvé dans les days 
  );

  // trouver le sutilsateur qui sont avec le jour 
  const assignedUser = mockUsers.find(
    (user) => user._id === week.assignedUserId
  );

  return (
    <div className="week-detail-container">
      {/* bouton pour retourner en arrière  */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Retour 
      </button>
      <h1>week planning</h1>
      <p>{week.startWeek} to {week.endWeek} </p>

      <div className="days-list">
        {daysForWeek.map((day, index) => (
          // pour chaque jour on génère une clé
          <div key={day._id} className="day-item">
            {/* Affiché du nom du jour à partir de la date */}
            <div className="day-header">
    <h2>{getDayName(day.date)}</h2>
    <h2 className="date">{day.date}</h2>
  </div>
            <ul className="schedule-list">
              {day.schedule.map((slot, idx) => {
                // slot = créneau et idx indice de l'élément 
                const guardUser = mockUsers.find(
                  // recherche l'utilisateur correspondant 
                  (user) => user.firstName === slot.guard // est-ce que USER = personne de garde 
                );
                return (
                  <li
                    key={idx}
                    style={{ color: guardUser ? guardUser.color : "#000" }} // si y'a pas dans les personnes enregistrées alors écrit en noir 
                  >
                    {slot.period} : {slot.guard}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekDetail;
