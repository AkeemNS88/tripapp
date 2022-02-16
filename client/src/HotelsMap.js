import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PlanNewTrip from "./PlanNewTrip";
import LandmarkMap from "./LandmarkMap";
import {Button} from "react-bootstrap"
import ReactStars from "react-rating-stars-component";



function HotelsMap() {
  const [viewport, setViewport] = useState({
    width: "1700px",
    height: "638px",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
    
  });

  const [addEntryLocation, setAddEntryLocation] = useState({
    latitude: 41.902782,
    longitude: 12.496365,
  });

  const [hotels, setHotels] = useState([]);
  // const takeHotels = (newHotels) => {
  //   setHotels(newHotels);
  // };

  const [showPopup, setshowPopup] = React.useState({});

  const takeCordinate = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
    fetch(
      `/hotels?lat=${addEntryLocation.latitude}&long=${addEntryLocation.longitude}`
    )
      .then((response) => response.json())
      .then((hotels) => setHotels(hotels.data.results));
  };

  const [pointsInteres, setPointsInters] = useState([]);
  const takePoi = (newPoi) => {
    setPointsInters(newPoi);
  };

  const [showMap, setShowMap] = useState(true);

  return (
    <>
      <PlanNewTrip  hotels={hotels} pointsInteres={pointsInteres} />
      {showMap ? (
        <>
          <Button variant="outline-dark" id="tagglebutton" onClick={() => setShowMap(false)}>
            {" "}Points of interest{" "}
          </Button>
          <p id="hotelmap">{" "} Hotels {" "}</p>
          <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/djhype41/ckz7614kq002414th1qdefdgp"
            mapboxApiAccessToken="pk.eyJ1IjoiZGpoeXBlNDEiLCJhIjoiY2t6NHJzcHI4MGpsYzJvcGgwdmlmeWp2OCJ9.I3H41cBWm2dSoHrg6tQf1w"
            onViewportChange={setViewport}
            onDblClick={takeCordinate}
          >
            {hotels.map((hotel) => {
              return (
                <React.Fragment key={hotel.id}>
                  <Marker
                    latitude={hotel.geometry.location.lat}
                    longitude={hotel.geometry.location.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                  >
                    <div
                      onClick={() =>
                        setshowPopup({
                          [hotel.place_id]: true,
                        })
                      }
                    >
                      <svg
                        className="marker"
                        classviewbox="0 0 24 24"
                        width="56px"
                        height="56px"
                        stroke=" #8100eb "
                        stroke-width="2"
                        fill="#8100eb"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                  </Marker>
                  {showPopup[hotel.place_id] ? (
                    <Popup
                      latitude={hotel.geometry.location.lat}
                      longitude={hotel.geometry.location.lng}
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setshowPopup({})}
                      anchor="top"
                    >
                      <div className="showhotel">
                        <h5>{hotel.name}</h5>
                        <label>Address:</label>
                        <p>{hotel.formatted_address}</p>
                        {/* <label>rating:</label>
                        <span> {hotel.rating} </span>
                        <p> { Array().fill().map((_, i) => ( <span>🍌</span> )) }</p> */}
                      </div>
                    </Popup>
                  ) : null}
                </React.Fragment>
              );
            })}
          </ReactMapGL>
        </>
      ) : (
        <>
          <Button id="button5" variant="dark" onClick={() => setShowMap(true)}>
            {" "}Show Hotels{" "}
          </Button>
          <LandmarkMap hotels={hotels} takePoi={takePoi} />
        </>
      )}
    
    </>
  );
}
export default HotelsMap;