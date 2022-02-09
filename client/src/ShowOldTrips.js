import {useState} from "react"

function ShowPlanedTrips(){

    const[infoNewTrip, setInfoNewTrip]= useState([])


    
    const handleFetch = () =>{
        fetch('/oldstrips')
        .then(res => res.json())
        .then(data => setInfoNewTrip(data))
    }

    

    const renderInfo = infoNewTrip.map((info)=>{
        return <div key={info.place_id}>
            <p>City: {info.name}</p>
            <p>Date:{info.date}</p>
            <p>Hotel:{info.hotel}</p>
        </div>
    })

    return (
       <div>
       <button onClick={handleFetch}>Show details</button>
       {renderInfo}

       </div>
    )
}

export default ShowoldTrips