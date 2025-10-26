import { useEffect, useRef, useState } from "react";
import s from "./Autocomplete.module.css";

export const AutocompleteTwo = ({ isLoaded }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!window.google) return;

    const service = new window.google.maps.places.AutocompleteService();

    const fetchSuggestions = (input) => {
      if (!input) {
        setSuggestions([]);
        return;
      }

      // Новий метод AutocompleteSuggestion
      service.getPlacePredictions({ input }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions || []);
        } else {
          setSuggestions([]);
        }
      });
    };

    inputRef.current.oninput = (e) => {
      const text = e.target.value;
      setValue(text);
      fetchSuggestions(text);
    };
  }, [isLoaded]);

  const handleSelect = (placeId, description) => {
    setValue(description);
    setSuggestions([]);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        console.log("📍 Coordinates:", {
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={s.root}>
      <input
        type="text"
        className={s.input}
        placeholder="Where are you going?"
        value={value}
        onChange={handleInput}
        ref={inputRef}
        disabled={!isLoaded}
      />
      {suggestions.length > 0 && (
        <ul className={s.suggestions}>
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              onClick={() => handleSelect(sug.place_id, sug.description)}
              className={s.listItem}
            >
              {sug.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
