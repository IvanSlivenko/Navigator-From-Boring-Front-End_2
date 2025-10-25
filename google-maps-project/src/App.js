import { Map } from './components/Map'
import './App.css';

import { useJsApiLoader } from '@react-google-maps/api'

const API_KEY = process.env.REACT_APP_API_KEY
console.log("API_KEY", API_KEY)

const defaultCenter = {
  // lat: -3.745,
  // lng: -38.523,

  lat: 48.7492,
  lng: 30.2219,
}



const libraries = ['places']

const App = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })

  return (
    <div className="App">
      {isLoaded ? <Map center={defaultCenter} /> : <h2>Loading</h2>}

    </div>
  );
}

export default App;
