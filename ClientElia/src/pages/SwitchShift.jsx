import { useState } from 'react'
import "./styleSwitchDay.css";
import { use } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function SwitchShift() {
    const [users,setUsers]=useState([])
    const [worker,setWorker]=useState("");
    const [reason,setReason]=useState("");
    const [day,setDay]=useState({});
    const {dayId}=useParams();
    const queryParams = new URLSearchParams(window.location.search);  // Pour récupérer les query params
    const indexShift= queryParams.get('indexShift');
    const weekId=queryParams.get('weekId');
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

    const   getDay=()=>{
      fetch('http://localhost:5000/api/days/'+dayId, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Si tu utilises des cookies de session ou l'authentification
      })
      .then(response => response.json())
      .then(data =>{
        setDay(data);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    }

    useEffect(() => {
      getUsers();
      getDay();
    }, []);

    const updateWorker=(e)=>{
        setWorker(e.target.value);
    }

    const updateReason=(e)=>{
        setReason(e.target.value);
    }

  const getUpdatedDay=()=>{
    const updatedDay= {
      ...day, 
      schedule: day.schedule.map((shift,i)=>
        i==Number(indexShift)?{...shift,guard:worker}:shift)
    };
    return updatedDay;
  }

  const updateShift=async (updatedDay)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/days/${dayId}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(updatedDay)
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Day updated:", data);
    } catch (error) {
      console.error("Error updating guard in day:", error);
    }
  }

    const confirmRequest=()=>{
      const updatedDay=getUpdatedDay();
      // remplace le système de notifications pour confirmer
      if(worker && reason){
        window.confirm("Do you want to confirm that switch ?")?updateShift(updatedDay):alert("Switch cancelled");
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
            <div className='from-container'>
            <div className='workerContainer'>
                <label htmlFor="worker">Switch with</label>
                <select name="worker" id="worker" value={worker} onChange={updateWorker}>
                    <option value="" disabled>Select a worker</option>
                    {users  .filter(user => user.role !== "admin")
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

export default SwitchShift
