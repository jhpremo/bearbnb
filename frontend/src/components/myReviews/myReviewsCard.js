import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/reviewsReducer";
import StarRatings from "react-star-ratings";
import "./my-review-card.css"
import { useHistory } from "react-router-dom";

function MyReviewCard({ review }) {
    const history = useHistory()
    let postDate = new Date(review.createdAt)
    let year = postDate.getFullYear()
    let month = postDate.toLocaleString('default', { month: 'long' });
    const dispatch = useDispatch()
    const deleteClick = () => {
        dispatch(deleteReviewThunk(review.id))
    }
    const user = useSelector((state) => state.session.user)

    return (
        <div className="my-review-card">
            <div className="my-review-content">
                <img className="my-review-card-image" onClick={() => history.push(`/spots/${review.Spot.id}`)} src={review.Spot.previewImage}></img>

                <div className="my-review-content-inner">
                    <h2>{review.Spot.name} in {review.Spot.city}, {review.Spot.state}</h2>
                    <div><StarRatings
                        rating={review.stars}
                        starRatedColor='black'
                        numberOfStars={5}
                        starDimension='15px'
                        starSpacing='1px'
                    />
                        <span> {month + " " + year}</span>
                    </div>
                    <p>{review.review}</p>
                </div>
            </div>
            {review.userId === user?.id && <button type='button' onClick={deleteClick}>Delete</button>}
        </div>
    )
}

export default MyReviewCard
