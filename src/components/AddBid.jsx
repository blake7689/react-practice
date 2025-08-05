import { useState, useTransition } from "react";

// AddBid component to allow users to add a new bid
// It uses the useTransition hook to manage the state of adding a bid
// It takes a house object and an addBid function as props
const AddBid = ( {house, addBid} ) => {
    const [isPending, startTransition] = useTransition();

    const emptyBid = {
        houseId: house.id,
        bidder: "",
        amount: 0,
    };

    const [newBid, setNewBid] = useState(emptyBid);

    // Function to handle the submission of a new bid
    // It uses the addBid function passed as a prop to add the new bid
    // The new bid is reset to an empty state after submission
    // This ensures that the component can reset the form after adding a bid
    const onBidSubmitClick = () => { 
        startTransition(async() => { 
            await addBid(newBid);   
        });
        setNewBid(emptyBid);
    };

    return (
        <div className="row">
            <div className="col-5">
                <input
                    id="bidder"
                    className="h-100 form-control"
                    type="text"
                    value={newBid.bidder}
                    onChange={(e) => 
                        setNewBid({
                            ...newBid,
                            bidder: e.target.value
                        })
                    }
                    placeholder="Bidder"
                ></input>
            </div>
            <div className="col-5">
                <input
                    id="amount"
                    className="h-100 form-control"
                    type="number"
                    value={newBid.amount}
                    onChange={(e) =>
                        setNewBid({
                            ...newBid,
                            amount: parseInt(e.target.value)
                        })
                    }
                    placeholder="Amount"
                ></input>
            </div>
            <div className="col-2">
                <button className="btn btn-primary"
                    onClick={onBidSubmitClick} disabled={isPending}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddBid;