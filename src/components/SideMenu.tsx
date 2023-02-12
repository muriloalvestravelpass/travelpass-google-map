import Distance from "./Distance";
import { DirectionsResult, LatLngLiteral } from "./Map";
import Places from "./Places";

type SideMenuProps = {
  isVisible: boolean;
  onPlaceSelection: (position: LatLngLiteral) => void;
  directions: DirectionsResult | undefined;
};

export const SideMenu = ({
  isVisible,
  onPlaceSelection,
  directions,
}: SideMenuProps) => {
  return (
    <div className="controls">
      <h1>Commute?</h1>
      <Places setOffice={onPlaceSelection} />
      {!isVisible && <p>Enter the address of your office.</p>}
      {directions && <Distance leg={directions.routes[0].legs[0]} />}
    </div>
  );
};
