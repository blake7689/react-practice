import { useLocation } from "react-router";
import currencyFormatter from "../helpers/currencyFormatter";
import BidList from "./BidList";
import loadingStatus from "../helpers/loadingStatus";
import useBids from "../hooks/useBids";
import LoadingIndicator from "./LoadingIndicator";
import AddBid from "./AddBid";

// House component to display details of a specific house
// It uses the useLocation hook to get the house data passed from the HouseList component.
const House = () => {

  // Get the current location and extract the house data from the state
  // This allows the component to access the house details that were clicked on in the HouseList
  const location = useLocation();

  // Destructure the house object from the location state
  // This is the house that was selected from the list to view its details
  const { house } = location.state;

// If the house data is not available, return null to avoid rendering errors
  const { bids, loadingState, addBid } = useBids(house.id);

  // If the loading state is not loaded, display a loading indicator
  // This ensures that the component waits for the bids data to be fetched before rendering
  if (loadingState !== loadingStatus.loaded)
        return <LoadingIndicator loadingState={loadingState} />;

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <img
              className="img-fluid"
              src={
                house.photo
                  ? `./houseImages/${house.photo}.jpeg`
                  : "./defaultphoto.png"
              }
              alt="House pic"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row mt-2">
            <h5 className="col-12">{house.country}</h5>
          </div>
          <div className="row">
            <h3 className="col-12">{house.address}</h3>
          </div>
          <div className="row">
            <h2 className="themeFontColor col-12">
              {currencyFormatter.format(house.price)}
            </h2>
          </div>
          <div className="row">
            <div className="col-12 mt-3">{house.description}</div>
          </div>
          <BidList bids={bids} />
          <AddBid house={house} addBid={addBid} />
        </div>
      </div>
    </>
  );
};

export default House;
