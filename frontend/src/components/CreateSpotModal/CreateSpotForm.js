import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { writeSpotThunk } from "../../store/spotsReducer";
function CreateSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [urls, setUrls] = useState('')
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    useEffect(() => {
        let errorsArr = []

        let parsedLat = parseFloat(lat)
        let parsedLng = parseFloat(lng)
        let parsedPrice = parseFloat(price)
        let urlArr = urls.split(/\r?\n/)

        const validateUrl = (urls) => {
            let check = true
            urls.forEach(url => {
                if (!url.includes('@')) check = false
                if (!url.includes('.')) check = false
            });
            return check
        }

        if (!(state && country && address && lat && lng && city && name && description && price)) errorsArr.push("All fields must be filled out")
        if (lat && (!parsedLat || lat < -90 || lat > 90)) errorsArr.push("Latitude must be a number between -90 and 90")
        if (lng && (!parsedLng || lng < -180 || lng > 180)) errorsArr.push("Longitude must be a number between -180 and 180")
        if (name && name.length > 50) errorsArr.push("Spot name must be less than 50 characters")
        if (description && description.length > 255) errorsArr.push("Spot description must be less than 255 characters")
        if (price && !parsedPrice) errorsArr.push('Price must be a number')
        if (!validateUrl([previewImageUrl])) errorsArr.push('Preview image must have a valid url')
        if (!validateUrl(urlArr)) errorsArr.push('Each additional imags must have a valid url seperated by a new line')

        setErrors(errorsArr)
    }, [state, country, lat, address, lng, city, name, description, price, previewImageUrl, urls])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length) {
            setSubmitted(true)
            return
        }
        let payload = {
            state,
            country,
            lat,
            address,
            lng,
            city,
            name,
            description,
            price
        }
        let urlArr = urls.split(/\r?\n/)

        let spotId = await dispatch(writeSpotThunk(payload, previewImageUrl, urlArr))
        history.push(`/spots/${spotId}`)
        setShowModal(false)
    };

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='top-bar'>
                    <h4 id='form-header-1'>Host a Spot</h4>
                </div>
                <h3 id='form-header-2'>Tell us about your spot</h3>
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
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Latitude
                            </label>
                            <input
                                type="text"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Longitude
                            </label>
                            <input
                                type="text"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
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
                        <div className='input-wrapper'>
                            <label className='input-label'>
                                Preview image url
                            </label>
                            <input
                                type="text"
                                value={previewImageUrl}
                                onChange={(e) => setPreviewImageUrl(e.target.value)}
                                required
                                className='form-input'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label className='input-label'>Addition image urls (one per line)</label>
                            <textarea
                                className='form-input'
                                onChange={e => setUrls(e.target.value)}
                                value={urls}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-wrapper'>
                    <button type="submit" className='submit-button'>Post Spot</button>
                </div>
            </form>
        </div >
    );
}


export default CreateSpotForm
