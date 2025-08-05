import currencyFormatter from "../helpers/currencyFormatter";
import { useNavigate } from "react-router";

// HouseRow component to display a single row of house data
// It uses the useNavigate hook to navigate to the House component when clicked.
const HouseRow = ({ house }) => {
  const navigate = useNavigate();
  return (
    <tr onClick={() => navigate("/house", { state: { house } })}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price && (
        <td className={`${house.price >= 500000 ? "text-primary" : ""}`}>
          {currencyFormatter.format(house.price)}
        </td>
      )}
    </tr>
  );
};

export default HouseRow;