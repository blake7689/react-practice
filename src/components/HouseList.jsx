import loadingStatus from "../helpers/loadingStatus";
import useHouses from "../hooks/useHouses";
import ErrorBoundary from "./ErrorBoundary";
import HouseRow from "./HouseRow";
import LoadingIndicator from "./LoadingIndicator";
import AddHouse from "./AddHouse";

// HouseList component to display a list of houses
// It uses the useHouses custom hook to fetch and manage houses data.
const HouseList = () => {
  const { houses, loadingState, addHouse } = useHouses();

  // If the loading state is not loaded, display a loading indicator
  // If there is an error, it will be handled by the ErrorBoundary component.
  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />

  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          <ErrorBoundary fallback="Error loading house rows!">
            {houses.map((h) => (
              <HouseRow key={h.id} house={h} />
            ))}
            
          </ErrorBoundary>
        </tbody>
      </table>
      <AddHouse addHouse={addHouse} />
    </>
  );
};

export default HouseList;
