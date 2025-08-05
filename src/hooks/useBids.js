import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";

// Custom hook to manage bids data
// It fetches bids for a specific house from the server, manages loading state, 
// and provides a function to add new bids.
// It returns the bids, loading state, and the addBid function.
const useBids = (houseId) => {
  const [bids, setBids] = useState([]);
  const [loadingState, setLoadingState] =
    useState(loadingStatus.isLoading);
  
  // Runs once when the component mounts to fetch bids
  // for the specified house and sets the loading state accordingly.
  useEffect(() => {
    const fetchBids = async () => {
      setLoadingState(loadingStatus.isLoading);
      try {
        const response =
          await fetch(`https://localhost:4000/bid/${houseId}`);
        const bids = await response.json();
        setBids(bids);
        setLoadingState(loadingStatus.loaded);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    }
    fetchBids();
  }, [houseId]);

// Function to post a new bid to the server
// and update the local state with the new bid.
  const postBid = async (bid) => {
    const rsp = await fetch("https://localhost:4000/bid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
    return await rsp.json();
  };

  // Function to add a new bid, which posts it to the server
  // and updates the local state with the newly added bid.
  const addBid = async (bid) => {
    const postedBid = await postBid(bid);
    setBids([...bids, postedBid]);
  };

  // Returns the bids, loading state, and the addBid function
  // to be used in components that need to display or add bids.
  return { bids, loadingState, addBid };
};

export default useBids;
