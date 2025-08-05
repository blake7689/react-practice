import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";

// Custom hook to manage houses data
// It fetches houses from the server, manages loading state,
// and provides a function to add new houses.
// It returns the houses, loading state, and the addHouse function.
const useHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loadingState, setLoadingState] =
    useState(loadingStatus.isLoading);

  //Runs once when the component mounts to fetch houses
  //and sets the loading state accordingly.
  useEffect(() => {
    const fetchHouses = async () => {
      setLoadingState(loadingStatus.isLoading);
      try {
        const response = await fetch("https://localhost:4000/house");
        const houses = await response.json();
        setHouses(houses);
        setLoadingState(loadingStatus.loaded);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    };
    fetchHouses();
  }, []);

  //Function to post a new house to the server
  //and update the local state with the new house.
  const postHouse = async (house) => {
    const rsp = await fetch("https://localhost:4000/house", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(house),
    });
    return await rsp.json();
  };

  //Function to add a new house, which posts it to the server
  //and updates the local state with the newly added house.
  const addHouse = async (house) => {
    const postedHouse = await postHouse(house);
    setHouses([...houses, postedHouse]);
  };

  //Returns the houses, loading state, and the addHouse function
  //to be used in components that need to display or add houses.
  return { houses, loadingState, addHouse };
};

export default useHouses;