import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk } from "../../store/spotsReducer";
import { useHistory } from "react-router-dom";
function DeleteSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const spotId = useSelector(state => state.spots.singleSpot.id)
    const name = useSelector(state => state.spots.singleSpot.name)

    const [active, setActive] = useState(true)
    const [spotName, setSpotName] = useState('')

    useEffect(() => {
        if (spotName === name) setActive(false)
        else setActive(true)
    }, [spotName, name])


    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteSpotThunk(spotId))
        setShowModal(false)
        history.push('/')
    };

    const closeModal = () => setShowModal(false)
    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form small-form'>
                <div className='top-bar'>
                    <i class="fa-solid fa-x form-x" onClick={closeModal} />
                    <h4 id='form-header-1'>Delete Your Spot</h4>
                </div>
                <div className='input-wrapper'>
                    <label className='input-label delete-label'>
                        Caution: deleting your spot will permenantly remove it from bearbnb and cancel all future bookings, enter the spot name below to confirm
                    </label>
                    <input
                        type="text"
                        value={spotName}
                        onChange={(e) => setSpotName(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <button type="submit" className='submit-button' disabled={active}>Delete Spot</button>
                </div>
            </form>
        </div >
    );
}


export default DeleteSpotForm
