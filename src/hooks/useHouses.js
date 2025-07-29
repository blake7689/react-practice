import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";

const useHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loadingState, setLoadingState] =
    useState(loadingStatus.isLoading);

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

  const addHouse = async (house) => {
    const postedHouse = await postHouse(house);
    setHouses([...houses, postedHouse]);
  };

  return { houses, loadingState, addHouse };
};

export default useHouses;