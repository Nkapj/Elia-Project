import { useState } from 'react'
import "./styleSwitchDay.css";
import { use } from 'react';
import { useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

function SwitchDay() {
    const [users,setUsers]=useState([]);
    const [shifts,setShifts]=useState([]);
    const [startTime,setStartTime]=useState("07:30");
    const [endTime,setEndTime]=useState("07:30");
    const [lastTimeShift,setLastTimeShift]=useState("07:30");
    const [isChecked,setIsChecked]=useState(false);
    const [workerForSchedule,setWorkerForSchedule]=useState("");
    const [worker,setWorker]=useState("");
    const [reason,setReason]=useState("");

    const {dayId}=useParams();
    const queryParams = new URLSearchParams(window.location.search);  // Pour récupérer les query params
    const weekId = queryParams.get('weekId'); 

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
        data.sort((user1,user2)=>user1.shiftsCompleted-user2.shiftsCompleted);
        setUsers(data);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    }

    useEffect(() => {
      getUsers();
    }, []);

    const chooseWorkerForSchedule=(e)=>{
      setWorkerForSchedule(e.target.value)
    }

    const addShift = () => {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };
    
      let startMinutes = timeToMinutes(startTime);
      let endMinutes = timeToMinutes(endTime);
      let lastShiftEndMinutes = timeToMinutes(lastTimeShift);
      const startOfDay = timeToMinutes("07:30");
      const endOfDay = startOfDay + 24 * 60; // 07:30 du lendemain
    
      // Gérer les heures après minuit (ajout de 24h)
      if (startMinutes < startOfDay) startMinutes += 24 * 60;
      if (endMinutes < startOfDay) endMinutes += 24 * 60;
      if (lastShiftEndMinutes < startOfDay) lastShiftEndMinutes += 24 * 60;
    
      // Vérification unique avec toutes les conditions
      if (
        startMinutes!=lastShiftEndMinutes ||
        startMinutes < lastShiftEndMinutes || // Shift commence avant la fin du précédent
        endMinutes <= startMinutes ||        // Fin doit être après début
        endMinutes > endOfDay + 1        // **Autorise jusqu'à 07:30 exactement**

      ) {
        alert("Shift invalid !");
        return;
      }
    
      // Ajouter le shift s'il est valide
      const newShift = { start: startTime, end: endTime, guard: workerForSchedule };
      setShifts((prevShifts) => [...prevShifts, newShift]);
      setLastTimeShift(endTime);
    };
    

    const deleteShift=(indexToRemove)=>{
      if(shifts.length==indexToRemove+1){
        setShifts(shifts.filter((_,index)=>index!=indexToRemove));
        if(indexToRemove!=0){
          setLastTimeShift(shifts[indexToRemove-1].end);
        }else{
          setLastTimeShift("07:30")
        }
      }else{
        alert("Not possible to delete");
      }
    }

    const updateStartTime=(e)=>{
        setStartTime(""+e.target.value);
    }

    const updateEndTime=(e)=>{
        setEndTime(""+e.target.value);
    }

    const switchForDay=(e)=>{
        setIsChecked(!isChecked);
    }

    const updateWorker=(e)=>{
        const newShift={start:startTime,end:endTime,guard:e.target.value};
        setShifts(prevShifts => [...prevShifts, newShift]);
        setWorker(e.target.value);
    }

    const updateReason=(e)=>{
        setReason(e.target.value);
    }

    const getGuardName=(id)=>{
      const guard=users.find(user=>user._id==id);
      return guard?guard.firstName:"guard";
    }

  //met à jour un garde pour une journée  
  const updateDay=()=>{
    fetch(`http://localhost:5000/api/days/${dayId}`, {
      method: "PUT",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify({
        schedule:shifts
      }) 
    })
    .then((response) => response.json()) // Résultat de la réponse en JSON
    .then((data) => {
      console.log("Day updated:", data); // Affichage des données retournées
    })
    .catch((error) => {
      console.error("Error updating guard in day:", error); // Gestion des erreurs
    });
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


    //met à jour un garde pour une journée  
    const updateShifts=(userId,shiftsCompleted)=>{
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

    const confirmRequestForWholeDay=()=>{
      if(worker && reason){  
          if(window.confirm("Do you want to confirm that switch ?")){
            updateDay()
            const shiftsUserLogged=getShiftsUser(localStorage.getItem("email"));
            const shiftsWorker=getShiftsUser(worker);
            updateShifts(getIdUser(localStorage.getItem("email")),shiftsUserLogged>0?shiftsUserLogged-1:shiftsUserLogged);
            updateShifts(worker,shiftsWorker<100?shiftsWorker+1:shiftsWorker);
          }else{
            alert("Switch cancelled");
          }
          navigate("/week/"+weekId);
        }else{
          alert("Worker and Reason not chosen");
        }
    }

    const confirmRequestForSchedule=()=>{
      if(shifts.length>=2){
        if(reason){
          if(window.confirm("Do you want to confirm that switch ?")){
            updateDay()
            const shiftsUserLogged=getShiftsUser(localStorage.getItem("email"));
            updateShifts(getIdUser(localStorage.getItem("email")),shiftsUserLogged>0?shiftsUserLogged-1:shiftsUserLogged);
          }else{
            alert("Switch cancelled");
          }
          navigate("/week/"+weekId);
        }else{
          alert("Reason not chosen");
        }
      }else{
        alert("Schedule not created")
      }
    }

    const confirmRequest=()=>{
      if(isChecked){
        confirmRequestForWholeDay();
      }else{
        confirmRequestForSchedule();
      }
    }

  return (
    <>
        <div className='container'>
        <button className="back-button" onClick={() => navigate("/week/"+weekId)}>
        &larr; Back 
      </button>
            <h1>Switch request</h1>
            <hr className="separator" />
            <div className='from-container'>
            <div className='scheduleContainer'>
                <label htmlFor="schedule">Schedule</label>
                <div className='schedule' id='schedule'>
                    <div className='question'>
                      <p>Whole day ?</p>
                      <input type='checkbox' onClick={switchForDay}></input>
                    </div>
                    <div className='shiftContainer'>
                      <input type="time" value={startTime} onChange={updateStartTime} disabled={isChecked} />
                      <input type="time" value={endTime} onChange={updateEndTime} disabled={isChecked}/>
                      <div hidden={isChecked} >
                          <select name="worker" id="worker" value={workerForSchedule} onChange={chooseWorkerForSchedule}>
                              <option value="" disabled>Worker</option>
                              {users.filter(user => user.role !== "admin")
                                .map((user) => {
                                    return <option key={user._id} value={user._id}>{user.firstName}</option>;
                              })}
                          </select>

                      </div>
                      <button className='addShift' onClick={addShift} hidden={isChecked}>add time</button>
                    </div>
                    <div className='listShifts' hidden={isChecked}>
                      {shifts.map((s,index)=>{
                        return <div className='shift' key={index}>
                                <p>{s.start}-{s.end}</p>
                                <p>{getGuardName(s.guard)}</p>
                                <button onClick={() => deleteShift(index)} className='deleteShift'>x</button>
                              </div>;
                      })}
                    </div>
                </div>
            </div>

            <div className='workerContainer' style={{ display: isChecked ? 'flex' : 'none' }}>
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
                    <option value="urgence">Urgence</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <button onClick={confirmRequest}>Request</button>
        </div>
      </div>
    </>
  )
}

export default SwitchDay
