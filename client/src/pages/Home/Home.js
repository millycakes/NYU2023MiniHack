import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';

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
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: "AIzaSyDSayFz8uAODQGq3iCj5z1YWU1WXI5ky8U" }}
        defaultCenter={{ lat: pos.latitude, lng: pos.longitude }}
        defaultZoom={17}
      >
      </GoogleMapReact>
    </div>
  );
}