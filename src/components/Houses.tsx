import { Marker, MarkerClusterer } from "@react-google-maps/api";
import { LatLngLiteral } from "./Map";

type HousesProps = {
  houses: google.maps.LatLngLiteral[];
  office: LatLngLiteral;
  directionCallback: (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => void;
};

export const Houses = ({ houses, office, directionCallback }: HousesProps) => {
  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      directionCallback
    );
  };

  return (
    <MarkerClusterer>
      {(clusterer) => (
        <>
          {houses.map((house) => (
            <Marker
              key={house.lat}
              position={house}
              clusterer={clusterer}
              onClick={() => {
                fetchDirections(house);
              }}
            />
          ))}
        </>
      )}
    </MarkerClusterer>
  );
};
