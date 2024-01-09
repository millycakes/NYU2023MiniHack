import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker } from 'react-map-gl';
import OurMarker from "../../components/global/OurMarker";
import Header from "../../components/global/Header";
import Sidebar from "../../components/global/Sidebar";
import ReactSwitch from 'react-switch';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function Home() {
  const [places, setPlaces] = useState([])
  const [filteredplaces, setFilteredplaces] = useState([])
  const [mapstats, setMapstats] = useState({})
  const [mapReady, setMapReady] = useState(false)
  const [checked, setChecked] = useState(false);
  const [currentplace, setCurrentPlace] = useState(null);
  const [pos, setPos] = useState({ latitude: 40.729893, longitude: -73.998291 });
  const [viewport, setViewport] = useState({ latitude: 40.729893, longitude: -73.998291, zoom: 11 });

  const mapRef = useRef();

  const onMapLoad = ( map, event ) => {
    mapRef.current = map.target;
    // console.log("map is: ", map.target)
    setMapstats({bounds: map.target.getBounds(), zoom: map.target.getZoom()})
    setMapReady(true)
  }

  const onMarkerClick = (markerid, lat, lng) => {
    console.log('This is ->', markerid)
    // inside the map instance you can call any google maps method
    // mapRef.current.setCenter({ lat, lng })
    mapRef.current.easeTo({
      center: [lng, lat],
      duration: 2500,
      zoom: 14.5
    });
    setCurrentPlace(markerid)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPos({ latitude, longitude });
          // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const markers = useMemo(() => [
    { latitude: 40.729893, longitude: -73.998291, text: "20%", },
    { latitude: 40.72962729885485, longitude: -73.99936141218122, text: "45%", },
    { latitude: 40.72944704674394, longitude: -73.9983276230342, text: "15%", },
    { latitude: 40.730293, longitude: -73.992619, text: "10%", },
  ].map((place, index) => (
    <Marker key={index} latitude={parseFloat(place.latitude)} longitude={parseFloat(place.longitude)}>
      <OurMarker text={place.text} clickfunc={() => onMarkerClick(place.text, parseFloat(place.latitude), parseFloat(place.longitude))} />
    </Marker>
  )), [checked, filteredplaces]);

  return (
    <div style={{ height: '100vh', width: '100vw', padding: 0 }}>
      <Header />
      <Sidebar />
      <div id="switchparent" className='absolute top-20 z-50'>
        <ReactSwitch
          checked={checked}
          onChange={() => setChecked(!checked)}
          handleDiameter={28}
          offColor="#20232a"
          onColor="#20232a"
          offHandleColor="#5F9EA0"
          onHandleColor="#5F9EA0"
          height={40}
          width={70}
          borderRadius={6}
          activeBoxShadow="0px 0px 1px 2px #fffc35"
          uncheckedIcon={<div className="flex flex-col justify-center items-center"><BsSun size={20} color="white" /></div>}
          checkedIcon={<div className="flex flex-col justify-center items-center"><BsMoon size={20} color="white" /></div>}
          className="react-switch"
          id="small-radius-switch"
        />
      </div>
      <Map
        ref={mapRef}
        id='mainmap'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        onViewportChange={setViewport}
        onLoad={onMapLoad}
        onMoveEnd={() => {
          // console.log("new zoom is: ", mapRef.current.getZoom())
          setMapstats({bounds: mapRef.current.getBounds(), zoom: mapRef.current.getZoom()})
        }}
        initialViewState={viewport}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={checked ? "mapbox://styles/mapbox/navigation-night-v1" : "mapbox://styles/mapbox/streets-v12"}
      >
        {markers}
      </Map>
    </div>
  );
}