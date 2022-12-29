import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadUserBookingsThunk } from "../../store/bookings"
import MyBookingCard from "./myBookingCard"

const MyReservations = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const bookingsArr = useSelector((state) => Object.values(state.bookings.userBookings).reverse())
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
        dispatch(loadUserBookingsThunk()).then(() => setIsLoaded(true))
    }, [dispatch, sessionUser])
    return (
        <div className="my-reviews-wrapper">
            {isLoaded && bookingsArr.map((booking) => <MyBookingCard key={booking.id} booking={booking} />)}
        </div>
    )
}

export default MyReservations
