import { GoogleMap, Marker } from "@react-google-maps/api";
import s from "./CurrentLocationMarker.module.css";

export const CurrentLocationMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{
        url: "/map-marker.svg",
        scaledSize: new window.google.maps.Size(10, 10),
      }}
      label={{ text: "|", fontSize: "55px", color: "orange" }}
    />
  );
};
