import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchSessionReviewsThunk } from "../../store/reviewsReducer"
import MyReviewCard from "./myReviewsCard"


const MyReviews = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const reviewsArr = useSelector((state) => Object.values(state.reviews.user))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
        dispatch(fetchSessionReviewsThunk()).then(() => setIsLoaded(true))
    }, [dispatch, sessionUser])

    return (
        <div className="my-reviews-wrapper">
            {isLoaded && reviewsArr.map((review) => <MyReviewCard key={review.id} review={review} />)}
        </div>
    )


}

export default MyReviews
