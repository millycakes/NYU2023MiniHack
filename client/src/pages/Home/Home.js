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
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(() => {
    const mode = JSON.parse(localStorage.getItem('mode'));
    return typeof mode === 'boolean' ? mode : false;
  });
  const [currentplace, setCurrentPlace] = useState(null);
  const [pos, setPos] = useState({ latitude: 40.729893, longitude: -73.998291 });
  const [viewport, setViewport] = useState({ latitude: 40.729893, longitude: -73.998291, zoom: 11 });
  const [cards, setCards] = useState([]);

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
    const mode = JSON.parse(localStorage.getItem('mode'))
    console.log("mode is: ", mode, typeof mode)
    if (typeof mode === 'boolean') {
      setChecked(mode)
    }
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
  
  useEffect(() => {
    // whenever map is changed, check to see if the latitude and longitude of each place is within the bounds of the map, display if it is
    if (mapReady) {
      const placesWithinBounds = cards.filter(place => typeof place.lat === 'number' && typeof place.lng === 'number' &&
        mapstats.bounds.contains([parseFloat(place.lng), parseFloat(place.lat)])
      )
      // console.log("places within bounds are: ", placesWithinBounds)
      setFilteredplaces(placesWithinBounds)
    }
  }, [mapReady, mapstats, cards])

  const markers = useMemo(() => 
    cards.filter((place) => place.lat && place.lng)
      .map((place, index) => (
        <Marker key={index} latitude={parseFloat(place.lat)} longitude={parseFloat(place.lng)} anchor="bottom">
          {/* when marker is clicked, scroll to it's match in sidebar */}
          <OurMarker text={place.percentoff} clickfunc={() => onMarkerClick(place.id, parseFloat(place.lat), parseFloat(place.lng))} />
        </Marker>
  )), [cards]);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(checked))
    console.log("checked is: ", checked)
    const mode = JSON.parse(localStorage.getItem('mode'))
    console.log("mode is: ", mode)
  }, [checked])

  return (
    <div style={{ height: '100vh', width: '100vw', padding: 0 }}>
      <Header />
      <Sidebar cards={cards} setCards={setCards} focused={currentplace} />
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
        style={{ width: '60%', height: '100vh', position: 'absolute', right: 0 }}
        mapStyle={checked ? "mapbox://styles/mapbox/navigation-night-v1" : "mapbox://styles/mapbox/streets-v12"}
      >
        {markers}
      </Map>
    </div>
  );
}