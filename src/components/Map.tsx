import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SideMenu } from "./SideMenu";
import { Circles } from "./Circles";
import { Houses } from "./Houses";

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export function Map() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<google.maps.Map>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 40.7560639, lng: -73.9904721 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "e5b681e2e3e688ae",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  const houses = useMemo(() => generateHouses(center), [center]);


  return (
    <div className="container">
      <SideMenu
        isVisible={office ? true : false}
        directions={directions}
        onPlaceSelection={(position: LatLngLiteral) => {
          setOffice(position);
          mapRef.current?.panTo(position);
        }}
      />
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onRightClick={() => {
            alert("RIGHT CLICK RIGHT HERE");
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "yellow",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <Houses
                houses={houses}
                office={office}
                directionCallback={(result, status) => {
                  if (status === "OK" && result) setDirections(result);
                }}
              />
              <Circles office={office} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
