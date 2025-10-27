import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import { Map } from './components/Map';
// import { Autocomplete } from './components/Autokomplete';
import { AutocompleteTwo } from './components/Autokomplete';




import s from './App.module.css';

const API_KEY = process.env.REACT_APP_API_KEY
// console.log("API_KEY", API_KEY)

const defaultCenter = {
  // lat: -3.745,
  // lng: -38.523,

  lat: 48.7492,
  lng: 30.2219,
}



const libraries = ['places']

const App = () => {

  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })


  const onPlaceSelect = React.useCallback(
    (coordinates) => {
      setCenter(coordinates)
    },
    [],
  )

  if (!isLoaded) return <div>Loading map...</div>;

  return (


    <div>
      <div className={s.adressSearchContainer}>
        {/* <Autocomplete isLoaded={isLoaded} /> */}
        <AutocompleteTwo isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <button className={s.modeToggle}>Set markers</button>
      </div>

      {/* {isLoaded ? <Map center={defaultCenter} /> : <h2>Loading...</h2>} */}
      <Map center={center} />
    </div>


  );
}

export default App;
