import {useState} from "react"

function ShowPlanedTrips(){

    const[infoNewTrip, setInfoNewTrip]= useState([])

    const[attraction, setAttraction]=useState([])

    
    const handleFetch = () =>{
        fetch('/newtrips')
        .then(res => res.json())
        .then(data => setInfoNewTrip(data))
    }

    const handleAttractions = () =>{
        fetch('/attractions')
        .then(res => res.json())
        .then(data => setAttraction(data))
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

       <button onClick={handleAttractions}>Show attractions</button>
       </div>
    )
}

export default ShowPlanedTrips