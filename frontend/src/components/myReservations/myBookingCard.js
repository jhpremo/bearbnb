import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { useHistory } from "react-router-dom";
import { deleteBookingThunk } from "../../store/bookings";
function MyBookingCard({ booking }) {
    const history = useHistory()
    const dispatch = useDispatch()
    let postDate = new Date(booking.createdAt)
    let startDate = new Date(booking.startDate)
    let endDate = new Date(booking.endDate)
    const deleteClick = () => {
        dispatch(deleteBookingThunk(booking.id))
    }
    const user = useSelector((state) => state.session.user)


    return (
        <div className="my-review-card">
            <div className="my-review-content">
                <img className="my-review-card-image" onClick={() => history.push(`/spots/${booking.Spot.id}`)} src={booking.Spot.previewImage}></img>

                <div className="my-review-content-inner">
                    <h2>{booking.Spot.name}</h2>
                    <div className="reserved-from-div">Reserved from {startDate.toDateString()} through {endDate.toDateString()}</div>
                    <span>{booking.Spot.address}</span>
                    <div>{booking.Spot.city}, {booking.Spot.state}</div>
                    <div className="reserved-on-div">Reservation made on {postDate.toDateString()}</div>
                </div>
            </div>
            {booking.userId === user?.id && <button type='button' onClick={deleteClick}>Delete</button>}
        </div>
    )
}

export default MyBookingCard
