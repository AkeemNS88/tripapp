import { useState } from "react";
import LandmarkMap from "./LandmarkMap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import {Form,Row,Col} from 'react-bootstrap'
import React from "react"; 

function PlanNewTrip({ hotels, pointsInteres }) {
  const [formData, setFormData] = useState({
    city: "",
    date: "",
    hotel: "",
  });
  
  
  const [value, setvalue] = useState("");
  var frontEndAttractions = [];

  const handleOnchange = value => {
    setvalue(value);
    const arrValu = value.split(",");
    if (arrValu.length !== 0)  {
      frontEndAttractions.push(value);
      localStorage.setItem(
        "FrontEndAttractions",
        JSON.stringify(frontEndAttractions[0].split(","))
      );
     // need fertch for hotels ?? 
      arrValu.map((oneattraction) => {
       if(oneattraction !==" "){
        fetch("/attractions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: oneattraction,
          }),
        }).then((res) => {
          if (res.ok) {
            res.json().then((attractions) => {
              console.log("attractions - db", attractions);
            });
          } else {
            res.json().then((error) => {
              console.log(error);
            });
          }
        });
      }}
      );
      }
  };

  const listhotels = hotels.map((hotels) => {
    
    return <option id={hotels.place_id} key={hotels.place_id}>{hotels.name}</option>;
  });

  const listpoi = pointsInteres.map((poi) => {
    return { label: poi.name, value: poi.name };
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/newtrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newtrip) => {
          handleSubmit2(newtrip.id);
          alert("Tripanzee!!!!")
          setFormData({city: "", date:"", hotel:""})
          setvalue(null)
        });
      } else {
        res.json().then((error) => {
          console.log(error);
        });
      }
    });
  };

  const insertToAdventures = (tripId, attractionId) => {
    fetch("/adventures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newtrip_id: tripId,
        attraction_id: attractionId,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          //  console.log(data)}
        });
      } else {
        // r.json().then((err)=>setErrors([...errors, err.errors]))
      }
    });
  };
  const handleSubmit2 = (newtrip_id) => {
    var tempAttractions = JSON.parse(
      localStorage.getItem("FrontEndAttractions")
    );
    // console.log(tempAttractions);
    let validAttractions = [];
    fetch("/attractions")
      .then((res) => res.json())
      .then((data) => {
        console.log("get attraction", data);
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < tempAttractions.length; j++) {
            if (data[i].name === tempAttractions[j]) {
              validAttractions.push(data[i].id);
              console.log("array of valid data", validAttractions);
            }
          }
        }
        validAttractions.forEach((attractionId) => {
          console.log("AtractionId", attractionId);
          insertToAdventures(newtrip_id, attractionId);
          localStorage.setItem("FrontEndAttractions", null);
        });
        //insertToAdventures(newtrip_id, validAttractions);
      });
  };

  return (
    <>
    <h1 id="planNewTrip">where will you go </h1>
    
      <Form id="planNewTrip" onSubmit={handleSubmit}>
      <Row className="align-items-center">
         
        <Col xs="auto">
        <Form.Group className="mb-3">
        <Form.Label> Name your trip!</Form.Label>
        <Form.Control id="city" name="city" value={formData.city} onChange={handleChange}  />
        </Form.Group>
        </Col>

         <Col  xs="auto">
         <Form.Group className="mb-3">
         <Form.Label> Date</Form.Label>
          <Form.Control
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        </Col>

        <Col  xs="auto">
        <Form.Group className="mb-3">
        <Form.Label> Hotel</Form.Label>
        <Form.Select  id="dropdown" name="hotel" value={formData.hotel} onChange={handleChange}>
          {listhotels}
        </Form.Select>
        </Form.Group>
        </Col>

        <Col  xs="auto">
        <Form.Group className="mb-3">
        <Form.Label>Points of Interest</Form.Label>
        <MultiSelect
          className="multiselector"
          onChange={(val) => handleOnchange(val)}
          options={listpoi}
          // menuPosition='bottom'
          downArrow={true}
          defaultValue="Attraction Point"
          menuplacement="bottom"
        />
        </Form.Group>
        </Col>

        <Col xs="auto">
        <Form.Group className="mb-3">
        <button id="button3" >tripanzee</button>
        </Form.Group>
        </Col>
        </Row>
      </Form>
      {/* <tag >doubel click on the map where you wan to go!</tag> */}
      {/* <h3>Ctrl + drag will enable 3d mode</h3> */}
    </>
  );
}

export default PlanNewTrip;