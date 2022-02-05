import React from "react"; 
import {useEffect, useState} from "react"
import {Table, Button} from "react-bootstrap"
import Grafiket from "./Grafiket";


function TableFutureTrip(){

    const[newTrips,setNewTrips] = useState([])
   

    useEffect(() => {
        fetch('/mynewtrip')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNewTrips(data)})
    },[])

     
    const handleDelete =(val) =>{
        console.log("cfare do fshihet",val)
        fetch(`/newtrips/${val.id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(() => setNewTrips(newTrips.filter((item)=>item.id !== val.id)))
    } 
    const tableToRender=newTrips.map((val,key)=>{
        console.log(val)
          return(
            <>
            <tr key={key}>
            <td>{key+1}</td>
            <td>{val.city}</td>
            <td>{val.date}</td>
            <td>{val.hotel}</td>
            <td>  {val.attractions.map((i)=><tr key={i}>
            •{i.name}
            </tr>)}</td>
            <td><Button variant="outline-secondary" id="button7" onClick={()=>handleDelete(val)}>Delete</Button></td>
            </tr>
            
            </>
          )
    })
    return(
      <>
      <div>
         <Table id="table" striped bordered hover size="sm">
         <thead>
              <tr>
              <th>#</th>
              <th>City</th>
              <th>Date</th>
              <th>Hotel</th>
              <th>Attraction Point</th>
              </tr>
              </thead>

               <tbody> 
              {tableToRender}
              </tbody>
              </Table>

      </div>

      <Grafiket/>
      </>
    )

}
export default TableFutureTrip