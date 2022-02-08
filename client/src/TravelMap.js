import { render } from "react-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import AddNewTripForm from "./AddNewTripForm";
import { Button, Form, Label, Control } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
// import Directions from "react-map-gl-directions";

 
 const MAPBOX_TOKEN ="pk.eyJ1IjoiZGpoeXBlNDEiLCJhIjoiY2t6NHJzcHI4MGpsYzJvcGgwdmlmeWp2OCJ9.I3H41cBWm2dSoHrg6tQf1w"

function TravelMap({ currentUser }) {
  const [edit, setEdit] = useState({ point: false });
  const [ration, setRating] = useState("");
  const [formData, setFormData] = useState({
    comments: "",
    description: "",
    image: "",
    rating:ration,
    title: "",
    visitDate: "",
    id: "",
  });




  const [viewport, setViewport] = useState({
    width: "1720px",
    height: "700px",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3.5,
    
  });

  const [points, setPoints] = useState([]);

  const [showPopup, setShowPopup] = useState({});
  const [addNewLocation, setAddNewLocation] = useState(null);

 

  function handleEdit(point) {
    // console.log(point);
    setFormData({
      comments: point.comments,
      description: point.description,
      image: point.image,
      rating: ration,
      title: point.title,
      visitDate: point.visitDate,
      id: point.id,
    });
    setEdit({
      [point.id]: !edit.point,
    });
  }

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  console.log("will update db", formData);
  const handleSubmitUpdate = (e) => {
    console.log(" submit  update");
    e.preventDefault();
    fetch(`/oldtrips/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, rating: ration }),
    })
      .then((res) => res.json())
      .then((data) => {
        const triptorender = [...points].map((trip) => {
          if (trip.id === data.id) {
            return data;
          } else {
            return trip;
          }
        });
        setPoints(triptorender);
        setEdit({
          point: !edit.point,
        });
      });
    e.target.reset();
  };

  useEffect(() => {
    getEntries();
  }, []);

  
  const getEntries = () => {
    fetch("/mytrips")
      .then((res) => res.json())
      .then((trips) => {
          console.log("trips - db",trips)
        if(trips=== null){
          setPoints([{
            latitude: 0,
            longitude: 0,
          }])
        }else {
        setPoints(trips);
        }
        
      });
  };
  console.log("Points form",points)
  if (!currentUser) return [];

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddNewLocation({
      latitude,
      longitude,
    });
  };
  

console.log(points)
  return (
    <> 
      <ReactMapGL
        
        {...viewport}
        mapStyle="mapbox://styles/djhype41/ckz7614kq002414th1qdefdgp"
        mapboxApiAccessToken={"pk.eyJ1IjoiZGpoeXBlNDEiLCJhIjoiY2t6NHJzcHI4MGpsYzJvcGgwdmlmeWp2OCJ9.I3H41cBWm2dSoHrg6tQf1w"}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={showAddMarkerPopup}

        
      >
        
        
        {
          
        
        points.map((point) => {
          return (
            <React.Fragment key={point.id}>
              <Marker
                latitude={point.latitude}
                longitude={point.longitude}
                dynamicPosition={true}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div
                  onClick={() =>
                    setShowPopup({
                      [point.id]: true,
                    })
                  }
                >
                  <svg
                    className="marker"
                    classviewbox="0 0 24 24"
                    width="56"
                    height="56"
                    stroke="#FF0000"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </Marker>
              {showPopup[point.id] ? (
                edit[point.id] ? (
                  <Popup
                    latitude={point.latitude}
                    longitude={point.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => {
                      setShowPopup({});
                      setEdit({});
                    }}
                    anchor="top"
                  >
                    <>
                      <Form onSubmit={handleSubmitUpdate} className="form1">
                        <Form.Group className="mb-3">
                          <Form.Label> Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label> Comments</Form.Label>
                          <Form.Control
                            type="text"
                            name="comments"
                            value={formData.comments}
                            onChange={handleFormChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={32}
                            activeColor="#ff00d9"
                            
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label> Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label> Image</Form.Label>
                          <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleFormChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label> Visit Date </Form.Label>
                          <Form.Control
                            type="date"
                            name="visitDate"
                            value={formData.visitDate}
                            onChange={handleFormChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Button
                            variant="outline-light"
                            id="submitbutton"
                            type="submit"
                          >
                            Submit Edit
                          </Button>
                        </Form.Group>
                      </Form>
                    </>
                  </Popup>
                ) : (
                  <Popup
                    latitude={point.latitude}
                    longitude={point.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup({})}
                    anchor="top"
                  >
                    <div className="oldtripview">
                      <h3>{point.title}</h3>
                      <label> Comments:</label>
                      <p>{point.comments}</p>
                      <label> Rating:</label>
                      <p> { Array(point.rating).fill().map((_, i) => ( <span>🍌</span> )) }</p>
                     
                      <label> Description:</label>
                      <p style={{ maxWidth: 150 }}>{point.description}</p>
                      <label> Visited on:</label>
                      <p>{new Date(point.visitDate).toLocaleDateString()}</p>
                      <div>
                        {point.image && (
                          <img
                            id="imgmap"
                            src={point.image}
                            alt={point.title}
                            style={{ maxWidth: 160, maxHeight: 160 }}
                          />
                        )}
                      </div>
                      <Button
                        variant="outline-light"
                        id="bustbutton"
                        onClick={() => handleEdit(point)}
                      >
                        Edit
                      </Button>
                    </div>
                  </Popup>
                )
              ) : null}
            </React.Fragment>
          );}
        )}
        {addNewLocation ? (
          <>
            <Marker
              latitude={addNewLocation.latitude}
              longitude={addNewLocation.longitude}
              dynamicPosition={true}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>
                <svg
                  className="marker"
                  classviewbox="0 0 24 24"
                  width="56"
                  height="56"
                  stroke="#FF0000"
                  stroke-width="2"
                  fill="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addNewLocation.latitude}
              longitude={addNewLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddNewLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <AddNewTripForm
                  onClose={() => {
                    setAddNewLocation(null);
                    getEntries();
                  }}
                  location={addNewLocation}
                />
              </div>
            </Popup>
          </>
        ) : null}
      </ReactMapGL>
    </>
  );
}

export default TravelMap;
