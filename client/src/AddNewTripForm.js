import { useState } from "react";
import { Form, Label, Col, Button, Control } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import React from "react"; 

function AddNewTripForm({ location, onClose }) {
 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    comments: "",
    rating:"",
    description: "",
    image: "",
    latitude: location.latitude,
    longitude: location.longitude,
    visitDate: "",
  });
  console.log("this goes to db",formData)
  const[ration, setRating]=useState("")
   
  const [error, setErros] = useState([]);

  const ratingChanged = (newRating) => {
    setRating(newRating)
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleeSubmit = (e) => {
    e.preventDefault();
    fetch("/oldtrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        rating: ration }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((trip) => {
          setFormData(trip);
          onClose();
        });
      } else {
        res.json().then((error) => {
          setErros(error);
          setLoading(false);
        });
      }
    });
  };

  return (
    <Form onSubmit={handleeSubmit} className="form1">
      <Form.Group className="mb-3">
        <Form.Label> Title</Form.Label>
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Comments</Form.Label>
        <Form.Control
          name="comments"
          row={3}
          value={formData.comments}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Label> trip rating</Form.Label>

      <ReactStars
        
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
        color="#FFFFFF"
        char= "🍌"
      />

      <Form.Group className="mb-3">
        <Form.Label> Description</Form.Label>
        <Form.Control
          name="description"
          row={3}
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Image</Form.Label>
        <Form.Control
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Visit Date </Form.Label>
        <Form.Control
          name="visitDate"
          type="date"
          value={formData.visitDate}
          onChange={handleChange}
        />
      </Form.Group>

      <button id="buttonsubmit1">Submit</button>
     
    </Form>
  );
}

export default AddNewTripForm;
