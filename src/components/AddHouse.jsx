import { useState, useTransition } from "react";

const AddHouse = ( { addHouse } ) => {
    const [isPending, startTransition] = useTransition();

    const emptyHouse = {
        address: "",
        country: "",
        price: "",
    };

    const [newHouse, setNewHouse] = useState(emptyHouse);

    const onHouseSubmitClick = () => { 
        startTransition(async() => { 
            await addHouse(newHouse);   
        });
        setNewHouse(emptyHouse);
    };

    return (
        <div className="row align-items-center mb-3">
            <div className="col">
                <input
                    id="Address"
                    className="form-control"
                    type="text"
                    value={newHouse.address}
                    onChange={(e) =>
                        setNewHouse({
                            ...newHouse,
                            address: e.target.value
                        })
                    }
                    placeholder="Address"
                />
            </div>
            <div className="col">
                <input
                    id="country"
                    className="form-control"
                    type="text"
                    value={newHouse.country}
                    onChange={(e) =>
                        setNewHouse({
                            ...newHouse,
                            country: e.target.value
                        })
                    }
                    placeholder="Country"
                />
            </div>
            <div className="col">
                <input
                    id="price"
                    className="form-control"
                    type="number"
                    value={newHouse.price}
                    onChange={(e) =>
                        setNewHouse({
                            ...newHouse,
                            price: e.target.value === '' ? '' : parseInt(e.target.value)
                        })
                    }
                    placeholder="Asking Price"
                />
            </div>
            <div className="col-auto">
                <button className="btn btn-primary"
                    onClick={onHouseSubmitClick} disabled={isPending}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddHouse;