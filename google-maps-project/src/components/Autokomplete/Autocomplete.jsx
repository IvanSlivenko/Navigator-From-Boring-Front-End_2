import s from "./Autocomplete.module.css";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from "react";

export const Autocomplete = ({ isLoaded }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    // init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // callbackName: "YOUR_CALLBACK_NAME",
    // initOnMount: false,
    // requestOptions: {
    //   /* Define search scope here */
    // },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      console.log(description);
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={s.listItem}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  // useEffect(() => {
  //   if (isLoaded) {
  //     // init();
  //   }
  // }, [isLoaded]);

  return (
    <div className={s.root} ref={ref}>
      <input
        type="text"
        className={s.input}
        value={value}
        onChange={handleInput}
        // disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === "OK" && (
        <ul className={s.suggestions}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};
