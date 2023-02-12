import { Circle } from "@react-google-maps/api";
import { LatLngLiteral } from "./Map";

type CircleProps = {
  office: LatLngLiteral;
};

export const Circles = ({ office }: CircleProps) => {
  return (
    <>
      <Circle center={office} radius={15000} options={closeOptions} />
      <Circle center={office} radius={30000} options={middleOptions} />
      <Circle center={office} radius={45000} options={farOptions} />
    </>
  );
};

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
