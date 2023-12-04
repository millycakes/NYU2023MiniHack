import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';

import Marker from "../../components/global/Marker";

import Header from "../../components/global/Header";
import Sidebar from "../../components/global/Sidebar";

// const Marker = ({text}) => <div>{text}</div>;

export default function Home() {
  const [pos, setPos] = useState({ latitude: 0, longitude: 0 });
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPos({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setMapKey((prevKey) => prevKey + 1);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', padding: 0 }}>
      <Header />
      <Sidebar />
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: "AIzaSyDSayFz8uAODQGq3iCj5z1YWU1WXI5ky8U" }}
        defaultCenter={{ lat: pos.latitude, lng: pos.longitude }}
        defaultZoom={16}
      >
      <Marker lat={pos.latitude} lng= {pos.longitude} text="20%"/>
      <Marker lat={40.72962729885485} lng= {-73.99936141218122} text="45%"/>
      <Marker lat={40.72944704674394} lng= {-73.9983276230342} text="15%"/>
      <Marker lat={40.730293} lng= {-73.992619} text="10%"/>
      </GoogleMapReact>
    </div>
  );
}