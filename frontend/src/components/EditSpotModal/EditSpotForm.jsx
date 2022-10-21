import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk } from "../../store/spotsReducer";

function EditSpotForm({ setShowModal }) {
    const dispatch = useDispatch();

    const singleSpot = useSelector(state => state.spots.singleSpot)

    const [state, setState] = useState(singleSpot ? singleSpot.state : '');
    const [country, setCountry] = useState(singleSpot ? singleSpot.country : '');
    const [address, setAddress] = useState(singleSpot ? singleSpot.address : '');
    const [city, setCity] = useState(singleSpot ? singleSpot.city : '');
    const [name, setName] = useState(singleSpot ? singleSpot.name : '');
    const [description, setDescription] = useState(singleSpot ? singleSpot.description : '');
    const [price, setPrice] = useState(singleSpot ? singleSpot.price : '');
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)



    useEffect(() => {
        let errorsArr = []
        let parsedPrice = parseFloat(price)

        if (!(state && country && address && city && name && description && price)) errorsArr.push("All fields must be filled out")
        if (name && name.length > 50) errorsArr.push("Spot name must be less than 50 characters")
        if (description && description.length > 255) errorsArr.push("Spot description must be less than 255 characters")
        if (price && (!parsedPrice || parsedPrice <= 0)) errorsArr.push('Price must be a positive number')

        setErrors(errorsArr)
    }, [state, country, address, city, name, description, price])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length) {
            setSubmitted(true)
            return
        }
        let payload = {
            state,
            country,
            lat: '0',
            address,
            lng: '0',
            city,
            name,
            description,
            price
        }

        await dispatch(editSpotThunk(singleSpot.id, payload))
        setShowModal(false)
    };

    const closeModal = () => setShowModal(false)
    return (
        <div className='form-wrapper create-spot-form-wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='top-bar'>
                    <i class="fa-solid fa-x form-x" onClick={closeModal} />
                    <h4 id='form-header-1'>Edit Your Spot</h4>
                </div>
                <h3 id='form-header-2'>What's new about your spot</h3>
                {errors.length > 0 && submitted && <ul className="form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <div className="left-right-side-wrapper">
                    <div className="left-side">
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                City
                            </label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                State
                            </label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Country
                            </label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>

                    </div>
                    <div className="right-side">
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Spot name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Spot description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Spot price per night
                            </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                    </div>
                </div>
                <div className="bottom-side">
                    <div className='input-wrapper'>
                        <button type="submit" className='submit-button'>Post Spot Changes</button>
                    </div>
                </div>
            </form>
        </div >
    );
}


export default EditSpotForm
