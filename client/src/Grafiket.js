import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer , Label} from 'recharts';
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";


function Grafiket(){
    const[oldtripnum, setOldTripNum]=useState('')
    const[newtripnum, setNewTripNum]=useState('')
    
    const[showGraphs,setShpwGraps]=useState(false)

    const handleShowGraphs =( ) =>{
      fetch('/oldtripnumber')
       .then(res => res.json())
       .then(data => setOldTripNum(data))

       fetch('/newtripnumber')
       .then(res => res.json())
       .then(data => setNewTripNum(data))

      setShpwGraps(!showGraphs)
    }


  

    const data01 = [
      {
        "name": "Old Trips",
        "value": oldtripnum,
        "fill": "#023e8a",
      },
      {
        "name": "Planed Trips",
        "value": newtripnum,
      }]

      const data02 = [
         {
           "name": "Old Trips",
           "value": oldtripnum,
           "fill": "#023e8a",
         },
         {
           "name": "Planed Trips",
           "value": newtripnum,
         }]

         const COLORS = ['#3DCC91', '#FFB366'];



    return(
      <>
      <Button variant="outline-secondary" id="buttontotal" onClick={handleShowGraphs}>Total number of trips</Button>

      {showGraphs ? (
       <React.Fragment id="graphs">
       {/* <h3 style={{color:"blue"}}>Total number of trips</h3> */}
        <ResponsiveContainer width="100%" aspect={2} >
       <PieChart>
         <Tooltip/>
         <Pie  data= {data01} dataKey="value"  isAnimationActive={false}  cx="50%" cy="50%" outerRadius={80} fill="#0096c7" label/>
       </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
      ):null}
    </>
    ) 
}
export default Grafiket