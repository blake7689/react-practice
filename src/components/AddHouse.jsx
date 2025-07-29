import { useState, useTransition } from "react";
import styles from "./AddHouse.module.css";

const AddHouse = ( { addHouse } ) => {
    const [isPending, startTransition] = useTransition();

    const emptyHouse = {
        address: "",
        country: "",
        price: "",
        photo: null,
        photoFile: null,
    };

    const [newHouse, setNewHouse] = useState(emptyHouse);

    const onHouseSubmitClick = () => { 
        startTransition(async() => { 
            await addHouse({
                ...newHouse,
                photo: newHouse.photoFile
                    ? newHouse.photoFile.name.replace(/\.[^/.]+$/, "")
                    : null,
                photoFile: undefined 
            });   
        });
        setNewHouse(emptyHouse);
    };

    return (
        <div className="mb-3">
            <div className="row align-items-center mb-2">
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
            </div>
            <div className="row align-items-center">
                <div className={`col-auto ${styles.fileInputBox}`}>
                    <input
                        id="photo"
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setNewHouse({
                                ...newHouse,
                                photoFile: e.target.files[0] || null
                            })
                        }
                    />
                </div>
                <div className="col-auto">
                    <button className={`btn btn-primary ${styles.addHouseButton}`} 
                        onClick={onHouseSubmitClick} disabled={isPending}>
                        Add
                    </button>
                </div>
            </div>
            <div className="col-auto">
                {newHouse.photoFile && (
                    <img
                        src={URL.createObjectURL(newHouse.photoFile)}
                        alt="Preview"
                        className={styles.imagePreview}
                    />
                )}
            </div>
        </div>
    );
};

export default AddHouse;