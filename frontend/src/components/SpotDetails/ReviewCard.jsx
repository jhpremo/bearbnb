import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/reviewsReducer";
import { subtractSpotReviewActionCreator } from "../../store/spotsReducer";
import "./ReviewCard.css"

function ReviewCard({ review }) {
    let postDate = new Date(review.createdAt)
    let year = postDate.getFullYear()
    let month = postDate.toLocaleString('default', { month: 'long' });
    const dispatch = useDispatch()
    const deleteClick = () => {
        dispatch(deleteReviewThunk(review.id))
        dispatch(subtractSpotReviewActionCreator(review.stars))
        console.log('delete')
    }
    const user = useSelector((state) => state.session.user)
    let name
    if (review.userId === user?.id) name = "Your review"
    else name = review.User.firstName
    return (
        <div className="review-card">
            <div className="stars-name-wrapper">
                <h2>{name}</h2>
                <div><i className="fa-solid fa-star star" /> {review.stars}</div>
            </div>
            <h3>{month + " " + year}</h3>
            <p>{review.review}</p>
            {review.userId === user?.id && <button type='button' onClick={deleteClick}>Delete</button>}
        </div>
    )
}

export default ReviewCard
