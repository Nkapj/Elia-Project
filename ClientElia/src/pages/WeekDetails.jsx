import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import "./WeekDetail.css";
import { useEffect,useState } from "react";
import SwitchShift from "./SwitchShift";

// il faut convertur le format jour mmois année en anné mois et jour 
function convertToISO(dateString) {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}

// // retournée la date en jour 
function getDayName(dateString) {
  const isoString = convertToISO(dateString); // va rechercher la date dans le bon format 
  const date = new Date(isoString);
  const options = { weekday: "long" }; // long indique que pour le format date on veut le fromat long de son nom Lundi et pas lun 
  return new Intl.DateTimeFormat("en-EN", options).format(date);
  // Intl.DateTimeFormat = API JS pour formater des date en langues FR en entier appliquer a la date 
}

function WeekDetail() {
  const [userLogged,setUserLogged]=useState("");
  const [users,setUsers]=useState([])
  const [days,setDays]=useState([]);
  const[detailsWeek,setDetailsWeek]=useState({day:[]});
  const [guardWeek,setGuardWeek]=useState("");
  const { weekId } = useParams(); // ID de la semaine (par ex. "week1")
  const navigate = useNavigate();

  //chercher les détauls de la week

  const getDetailsWeekApi=()=>{
    fetch('http://localhost:5000/api/weeks/'+weekId, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Si tu utilises des cookies de session ou l'authentification
    })
    .then(response => response.json())
    .then(data => {
      setGuardWeek(data.guard);
      setDetailsWeek(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }

  //chercher les jours dans la db
  const getDaysForWeek=()=>{
    fetch('http://localhost:5000/api/days', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Si tu utilises des cookies de session ou l'authentification
    })
    .then(response => response.json())
    .then(data => {
      setDays(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }

  //chercher les users dans la db
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
      setUserLogged(data.find(u=>u.email==localStorage.getItem("email")).firstName);
      setUsers(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }

  useEffect(() => {
    getDetailsWeekApi();
    getDaysForWeek();
    getUsers();
  }, []);

  //clean la date
  const getCleanDate=(date)=>{
    const index = date.indexOf("T");  // Trouver l'index du "T"
    return date.slice(0, index);
  }

  //redirige vers la page de modification pour toute la semaine
  const switchUSerForWeek=()=>{
    if(userLogged.trim().toLowerCase()===getGuardName(guardWeek).trim().toLowerCase()){
      navigate(`/switchweek/${weekId}`);
    }else{
      alert("You are not in guard for this week! You can not edit it !");
    }
  }

  //redirige vers la page de modification pour toute la journée
  const switchUSerForDay=(idDay,guard)=>{
    if(associateDayToID(idDay).schedule.length==1){
      if(userLogged.trim().toLowerCase()===guard.trim().toLowerCase()){
        navigate(`/switchday/${idDay}?weekId=${weekId}`);
      }else{
        alert("You are not in guard this day ! You can not edit it !");
      }
    }else{
      alert("Schedule is done ! Go check with the administrator")
    }

  }

  //redirige vers la page de modification pour toute la journée
  const switchUserForShift=(e,idDay,guard,indexShift)=>{
    e.stopPropagation();
    if(userLogged.trim().toLowerCase()===guard.trim().toLowerCase()){
      navigate(`/switchShift/${idDay}?indexShift=${indexShift}&weekId=${weekId}`);
    }else{
      alert("You are not in guard at this time ! You can not edit it !");
    }
  }

  //associe le jour en question en fonction de l'id
  const associateDayToID=(id)=>{
    return days.find(d=>d._id==id);
  }

  //associe le nom avec l'id du user
  const getGuardName=(id)=>{
    const guard=users.find(user=>user._id==id);
    return guard?guard.firstName:"";
  }

  return (
    <div className="week-detail-container">
      <button className="back-button" onClick={() => navigate("/home")}>
        &larr; Back 
      </button>
      <h1>week planning</h1>
      <hr className="separator"></hr>
      <p>{detailsWeek.startDate?convertToISO(getCleanDate(detailsWeek.startDate)):""}  to {detailsWeek.endDate?convertToISO(getCleanDate(detailsWeek.endDate)):""} </p>
      
      <div className="days-list">
        {detailsWeek.day.map(d =>{
          const dayToShow=associateDayToID(d);
          return (
            // pour chaque jour on génère une clé
            <div onClick={() => switchUSerForDay(d,getGuardName(dayToShow.schedule[0].guard))} key={d} className="day-item">
              {/* Affiché du nom du jour à partir de la date */}
              <div className="day-header">
                <h2 className="day">{dayToShow?getDayName(convertToISO(getCleanDate(dayToShow.date))):""}</h2>
                <h2></h2>
                <h2 className="date">{dayToShow?convertToISO(getCleanDate(dayToShow.date)):""}</h2>
              </div>
              <ul className="schedule-list">
                {dayToShow?dayToShow.schedule.length==1?
                  <h2 className="people">{dayToShow?getGuardName(dayToShow.schedule[0].guard):""}</h2>:
                  dayToShow.schedule.map((shift, idx) => {
                    return <li className="timeGuard" key={idx}>
                    <span className="shift-time">{shift.start} - {shift.end}</span>
                    <span className="shift-guard">{getGuardName(shift.guard)}</span>
                    <span className="buttonSwitch"><button 
                  onClick={(e) => switchUserForShift(e, d, getGuardName(dayToShow.schedule[idx].guard), idx)} 
                  className="switchShift"> switch
                 </button></span>
                    
                  </li>
                  }):""
                }
              </ul>
          </div>
          )
        })}

      </div>
      <div className="switch-week-container">
  <button className="switch-week" onClick={()=>switchUSerForWeek()}>SWITCH WEEK</button>
</div>
    </div>
  );
}

export default WeekDetail;
