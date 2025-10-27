import { useEffect, useRef, useState } from "react";
import s from "./Autocomplete.module.css";

export const AutocompleteTwo = ({ isLoaded, onSelect }) => {
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
      service.getPlacePredictions({ input }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions || []);
        } else {
          setSuggestions([]);
        }
      });
    };

    const inputEl = inputRef.current;
    const handleInputEvent = (e) => {
      const text = e.target.value;
      setValue(text);
      fetchSuggestions(text);
    };

    inputEl.addEventListener("input", handleInputEvent);
    return () => inputEl.removeEventListener("input", handleInputEvent);
  }, [isLoaded]);

  const handleSelect = (description, placeId) => {
    setValue(description);
    setSuggestions([]);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: description }, (results, status) => {
      if (status === "OK" && results[0]) {
        const loc = results[0].geometry.location;

        const lat = loc.lat();
        const lng = loc.lng();

        console.log(description);
        console.log("📍 Coordinates:", { lat: loc.lat(), lng: loc.lng() });
        onSelect({ lat, lng });
      }
    });
  };

  return (
    <div className={s.root}>
      <input
        type="text"
        className={s.input}
        placeholder="Where are you going?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        disabled={!isLoaded}
      />
      {suggestions.length > 0 && (
        <ul className={s.suggestions}>
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              className={s.listItem}
              onClick={() => handleSelect(sug.description, sug.place_id)}
            >
              {sug.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
