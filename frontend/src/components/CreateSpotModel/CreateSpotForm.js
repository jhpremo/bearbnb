import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function CreateSpotForm() {
    const dispatch = useDispatch();
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='top-bar'>
                    <h4 id='form-header-1'>Host a Spot</h4>
                </div>
                <h3 id='form-header-2'>Tell us about your spot</h3>
                {errors.length > 0 && <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
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
                <div className='input-wrapper'>
                    <button type="submit" className='submit-button'>Post Spot</button>
                </div>
            </form>
        </div >
    );
}


export default CreateSpotForm
