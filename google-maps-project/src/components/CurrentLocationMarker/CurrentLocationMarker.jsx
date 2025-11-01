import { GoogleMap, Marker } from "@react-google-maps/api";
import s from "./CurrentLocationMarker.module.css";

export const CurrentLocationMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{
        url: "/map-marker.svg",
        // url: "/icon-location.svg",
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      // label={{ text: " ", fontSize: "55px", color: "orange" }}
    />
  );
};
