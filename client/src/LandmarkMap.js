import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PlanNewTrip from "./PlanNewTrip"


function LandmarkMap({ hotels, takePoi }) {
  //   const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: "1710px",
    height: "638px",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const [addEntryLocation, setAddEntryLocation] = useState({
    latitude: 41.902782,
    longitude: 12.496365,
  });

  const [pointsInteres, setPointsInters] = useState([]);

  const [showPopup, setshowPopup] = React.useState({});

  const [attractions, setAttraction] = useState({
    name: "",
    adress: "",
  });


  const takeCordinate = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
    fetch(
      `/places?lat=${addEntryLocation.latitude}&long=${addEntryLocation.longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        takePoi(data.data.results)
        setPointsInters(data.data.results)});
  };

  const hadleAttractionPoints = (poi) => {
    setAttraction({
      name: poi.name,
      adress: poi.formatted_address,
    });

 
  };

  return (
    <>
      <p id="attpointmap">Points of interest</p>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/djhype41/ckz7614kq002414th1qdefdgp"
        mapboxApiAccessToken="pk.eyJ1IjoiZGpoeXBlNDEiLCJhIjoiY2t6NHJzcHI4MGpsYzJvcGgwdmlmeWp2OCJ9.I3H41cBWm2dSoHrg6tQf1w"
        onViewportChange={setViewport}
        onDblClick={takeCordinate}
        
      >
        {pointsInteres.map((poi) => {
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
                    width="56px"
                    height="56px"
                    stroke="#ff00a2"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    
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
                  <div className="showpoi" onClick={() => hadleAttractionPoints(poi)}>
                
                    <h5>{poi.name}</h5>
                    <label>Address:</label>
                    <p>{poi.formatted_address}</p>
                   
                  </div>
                </Popup>
              ) : null}
            </React.Fragment>
          );
        })}
      </ReactMapGL>
     
    </>
  );
}

export default LandmarkMap;
