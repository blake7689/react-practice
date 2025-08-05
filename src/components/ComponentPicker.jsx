import navValues from "../navigation/navValues";
import House from "./House";
import HouseList from "./HouseList";

// ComponentPicker component to render different components based on the current navigation location
// It uses the currentNavLocation prop to determine which component to render.
const ComponentPicker = ({ currentNavLocation }) => {
  switch (currentNavLocation) {
    case navValues.home:
      return <HouseList />;
    case navValues.house:
      return <House />;
    default:
      return (
        <h3>
          No component for navigation value
          {currentNavLocation} found
        </h3>
      );
  }
};

export default ComponentPicker;
