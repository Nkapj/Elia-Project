import { useState } from 'react'
import "./styleSwitchDay.css";
import { use } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


function SwitchWeek() {
    const [users,setUsers]=useState([])
    const [worker,setWorker]=useState("");
    const [reason,setReason]=useState("");
    const [week,setWeek]=useState({});
    const [days,setDays]=useState([]);
    const {weekId}=useParams();
    const navigate=useNavigate();

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
        data.sort((user1, user2) => user1.shiftsCompleted-user2.shiftsCompleted)
        setUsers(data);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    }

    const getWeek=()=>{
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
        setWeek(data);
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

    useEffect(() => {
      getUsers();
      getWeek();
      getDaysForWeek();
    }, []);

    const updateWorker=(e)=>{
        setWorker(e.target.value);
    }

    const updateReason=(e)=>{
        setReason(e.target.value);
    }

    const getIdUser=(str)=>{
      return users.find(u=>u.email==str)._id;
    }

    const getShiftsUser=(str)=>{
      if(str==localStorage.getItem("email")){
        return users.find(u=>u.email==str).shiftsCompleted;
      }else{
        return users.find(u=>u._id==str).shiftsCompleted;
      }
    }
  
    const updateShiftsUserInDB=(userId,shiftsCompleted)=>{
      fetch(`http://localhost:5000/api/users/`+userId, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify({
          shiftsCompleted:shiftsCompleted
        })
      })
      .then((response) => response.json()) // Résultat de la réponse en JSON
      .then((data) => {
        console.log("NbShifts updated:", data); // Affichage des données retournées
      })
      .catch((error) => {
        console.error("Error updating shifts in user:", error); // Gestion des erreurs
      });
    }

  // met à jour tous les jours de la semaine en question
  const updateDayOfWeek=async (idDay)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/days/${idDay}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify({schedule:[{ guard: worker,start:"07:30",end:"23:59"}]}),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Day updated:", data);

    } catch (error) {
      console.error("Error updating guard in day:", error);
    }
      navigate("/home");
  }

  //met à jour un garde pour la semaine 
  const updateGuardForWeek=()=>{
    fetch(`http://localhost:5000/api/weeks/${weekId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        "Content-Type": "application/json" },
      body: JSON.stringify({
        guard:worker
      })
    })
      .then((response) => response.json()) // Résultat de la réponse en JSON
      .then((data) => {
        console.log("Week updated:", data); // Affichage des données retournées
        data.day.forEach(d=>updateDayOfWeek(d));
      })
      .catch((error) => {
        console.error("Error updating guard in week:", error); // Gestion des erreurs
      });
  }

  const getUsersWithNbWorkingDays=()=>{
    let workers=[];
    week.day.forEach(d=>{
      const dayOfWeek=days.find(e=>e._id==d);
      if(dayOfWeek.schedule.length==1){
        const workerExisting=workers.find(w=>w.guard===dayOfWeek.schedule[0].guard);
        if(workerExisting){
          workerExisting["shifts"]++;
        }else{
          workers.push({guard:dayOfWeek.schedule[0].guard,shifts:1});
        }
      }
    });
    return workers;
  }

  const updateShiftsForOtherUsers=()=>{
    let workers=getUsersWithNbWorkingDays();
    workers.forEach(w=>{
      let nbShiftsToUpdate=users.find(u=>u._id==w.guard).shiftsCompleted;
      nbShiftsToUpdate>0?nbShiftsToUpdate-=w.shifts:nbShiftsToUpdate;
      updateShiftsUserInDB(w.guard,nbShiftsToUpdate);
    });

  }

  const updateShiftsForUserChosen=(str)=>{
    let nbDays=7;
    let nb;
    nb=users.find(u=>u._id==str).shiftsCompleted;
    while(nb<100 && nbDays>0){
      nb++;
      nbDays--;
    }
    return nb;
  }

  const confirmRequest=()=>{
    // remplace le système de notifications pour confirmer
    if(worker && reason){
      if(window.confirm("Do you want to confirm that switch ?")){
        updateGuardForWeek();
        const shiftsUserLogged=getShiftsUser(localStorage.getItem("email"));
        const shiftsWorker=getShiftsUser(worker);
        updateShiftsForOtherUsers();
        updateShiftsUserInDB(worker,updateShiftsForUserChosen(worker));
      }else{
        alert("Switch cancelled");
      }
      navigate("/week/"+weekId);
    }else{
      alert("Worker and Reason not chosen");
    }
  }

  return (
    <>
        <div className='container'>
        <button className="back-button" onClick={() => navigate("/week/"+weekId)}>
        &larr; Back 
      </button>
            <h1>Switch request</h1>
            <hr className='separator'/>
            <div className='from-container'>
            <div className='workerContainer'>
                <label htmlFor="worker">Switch with</label>
                <select name="worker" id="worker" value={worker} onChange={updateWorker}>
                    <option value="" disabled>Select a worker</option>
                    {users.filter(user => user.role !== "admin")
                      .map((user) => {
                          return <option key={user._id} value={user._id}>{user.firstName}</option>;
                    })}
                </select>
            </div>

            <div className='reasonContainer'>
                <label htmlFor="reason">Reason of switch</label>
                <select name="reason" id="reason" value={reason} onChange={updateReason}>
                    <option value="" disabled>Select a reason</option>
                    <option value="sick">Sick</option>
                    <option value="holiday">Holiday</option>
                    <option value="Urgence">Urgence</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button onClick={confirmRequest}>Request</button>
          </div>
        </div>
    </>
  )
}

export default SwitchWeek
