import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PlanNewTrip from "./PlanNewTrip";
import LandmarkMap from "./LandmarkMap";
import {Button} from "react-bootstrap"

function HotelsMap() {
  const [viewport, setViewport] = useState({
    width: "1620px",
    height: "618px",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const [addEntryLocation, setAddEntryLocation] = useState({
    latitude: 41.902782,
    longitude: 12.496365,
  });

  const [hotels, setHotels] = useState([]);

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
      .then((data) => setHotels(data.data.results));
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
            {" "}
            Show Attraction Points{" "}
          </Button>
          <p id="hotelmap">{" "}Hotel Map {" "}</p>
          <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/djhype41/ckz7614kq002414th1qdefdgp"
            mapboxApiAccessToken="pk.eyJ1IjoiZGpoeXBlNDEiLCJhIjoiY2t6NHJzcHI4MGpsYzJvcGgwdmlmeWp2OCJ9.I3H41cBWm2dSoHrg6tQf1w"
            onViewportChange={setViewport}
            onDblClick={takeCordinate}
          >
            {hotels.map((poi) => {
              return (
                <React.Fragment key={poi.id}>
                  <Marker
                    latitude={poi.geometry.location.lat}
                    longitude={poi.geometry.location.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                  >
                    <div
                      onClick={() =>
                        setshowPopup({
                          [poi.place_id]: true,
                        })
                      }
                    >
                      <svg
                        className="marker"
                        classviewbox="0 0 24 24"
                        width="56p"
                        height="56"
                        stroke=" #5482A5 "
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
                  {showPopup[poi.place_id] ? (
                    <Popup
                      latitude={poi.geometry.location.lat}
                      longitude={poi.geometry.location.lng}
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setshowPopup({})}
                      anchor="top"
                    >
                      <div className="showhotel">
                        <h5>{poi.name}</h5>
                        <label>Address:</label>
                        <p>{poi.formatted_address}</p>
                        <p>{poi.rating} ⭐</p>
                        {/* (poi.photos)&&poi.photos.forEach((i)=>console.log(i.photo_reference))} */}
                        {/* {poi.photos && poi.photos.map((i)=><img src={i.photo_reference} alt={poi.name} />)} */}
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
            {" "}
            Show Hotels{" "}
          </Button>
          <LandmarkMap hotels={hotels} takePoi={takePoi} />
        </>
      )}
    
    </>
  );
}
export default HotelsMap;
