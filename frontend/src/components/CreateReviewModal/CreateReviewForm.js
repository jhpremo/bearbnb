import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSpotReviewThunk } from "../../store/reviewsReducer";
import { addSpotReviewActionCreator } from "../../store/spotsReducer";
function CreateReviewForm({ setShowModal }) {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot);
    const [stars, setStars] = useState(3);
    const [reviewText, setReviewText] = useState("");
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        let errorsArr = []

        if (reviewText && reviewText.length > 255) errorsArr.push("Review must be less than 255 characters")

        setErrors(errorsArr)
    }, [reviewText])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (errors.length) {
            setSubmitted(true)
            return
        }

        const reviewObj = {
            stars: parseInt(stars),
            review: reviewText
        }

        dispatch(postSpotReviewThunk(reviewObj, spot.id))
        dispatch(addSpotReviewActionCreator(parseInt(stars)))
        setShowModal(false)
    };

    const closeModal = () => setShowModal(false)

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form small-form'>
                <div className='top-bar'>
                    <i class="fa-solid fa-x form-x" onClick={closeModal} />
                    <h4 id='form-header-1'>Review Spot</h4>
                </div>
                <h3 id='form-header-2'>What did you think of {spot.name}</h3>
                {errors.length > 0 && submitted && <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <div className='input-wrapper'>
                    <label className='input-label'>
                        <i className="fa-solid fa-star star" /> {stars}
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>Review</label>
                    <textarea
                        className='form-input'
                        onChange={e => setReviewText(e.target.value)}
                        value={reviewText}
                    />
                </div>
                <div className='input-wrapper'>
                    <button type="submit" className='submit-button'>Post Review</button>
                </div>
            </form>
        </div >
    );
}

export default CreateReviewForm;
