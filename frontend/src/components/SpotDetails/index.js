import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneSpotThunk } from "../../store/spotsReducer";
import { useEffect, useState } from "react";
import EditSpotFormModal from "../EditSpotModal";
import "./SpotDetails.css"
import DeleteSpotFormModal from "../DeleteSpotModal";
import { fetchSpotReviewsThunk } from "../../store/reviewsReducer";
import ReviewCard from "./ReviewCard";
import CreateReviewFormModal from "../CreateReviewModal";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range'
import { loadSpotBookingsThunk } from "../../store/bookings";
import isWithinInterval from 'date-fns/isWithinInterval'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import { csrfFetch } from "../../store/csrf";

function SpotDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [start, setStart] = useState("Add date")
    const [end, setEnd] = useState("Add date")
    const [numNights, setNumNights] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)


    const [dateState, setDateState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    useEffect(() => {
        dispatch(fetchOneSpotThunk(spotId))
        dispatch(fetchSpotReviewsThunk(spotId))
        dispatch(loadSpotBookingsThunk(spotId))
    }, [dispatch, spotId])

    const spotObj = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session.user)
    const reviewsArr = useSelector((state) => Object.values(state.reviews.spot))
    const bookingsArr = useSelector((state) => Object.values(state.bookings.spotBookings))


    useEffect(() => {
        if (!isOpen) return;

        const closeMenu = () => {
            setIsOpen(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [isOpen]);

    if (spotObj && !spotObj.name) {
        return <></>
    }

    let usedImagesUrls = []
    let previewImageUrl

    if (spotObj.SpotImages) {
        for (let i = 0; i < spotObj.SpotImages.length; i++) {
            let image = spotObj.SpotImages[i]
            if (image.preview) previewImageUrl = image.url
            else {
                usedImagesUrls.push(image.url)
            }
            if (usedImagesUrls.length >= 4 && previewImageUrl) break
        }
    }

    let hasReview = false

    for (let i = 0; i < reviewsArr.length; i++) {
        if ((reviewsArr[i].User && reviewsArr[i].User.id === user?.id) || reviewsArr[i].User === undefined) {
            hasReview = true
            break
        }
    }

    const changeDateRange = (item) => {
        let check = true
        console.log(item)
        for (let booking of bookingsArr) {
            if (areIntervalsOverlapping({ start: new Date(booking.startDate), end: new Date(booking.endDate) }, { start: item.selection.startDate, end: item.selection.endDate })) {
                check = false
                break
            }
        }
        if (check) {
            setDateState([item.selection])
            setIsChanged(true)
        }
    }

    const disabledDates = (date) => {
        let check = false
        for (let booking of bookingsArr) {
            if (isWithinInterval(date, { start: new Date(booking.startDate), end: new Date(booking.endDate) })) {
                check = true
                break
            }
        }
        return check
    }

    const handleReserve = async () => {
        if (start === "Add date" || end === "Add date") {
            setIsOpen(true)
            return
        }
        let startPost = new Date(start)
        let endPost = new Date(end)
        let payload = {
            startDate: startPost.toString(),
            endDate: endPost.toString()
        }
        console.log(payload)
        let res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })

        if (res.ok) history.push("/my-reservations")
    }

    return (
        <div className="spot-details-wrapper">
            <div className="spot-title-bar">
                <h1>{spotObj.name}</h1>
                {spotObj.ownerId === user?.id &&
                    <div>
                        <EditSpotFormModal />
                        <DeleteSpotFormModal />
                    </div>}
            </div>
            <div className="reviews-location-wrapper">
                <h2><i className="fa-solid fa-star star" /> {spotObj.avgStarRating}</h2>
                <h2> · </h2>
                <h2>{spotObj.numReviews} reviews</h2>
                <h2> · </h2>
                <h2>{spotObj.city}, {spotObj.state}, {spotObj.country}</h2>
            </div>
            <div className="spot-images-wrapper">
                <div className="preview-image" style={{ backgroundImage: `url(${previewImageUrl})` }}></div>
                <div className="top-four-image-wrapper">
                    <div className="top-four-image" style={{ backgroundImage: `url(${usedImagesUrls[0]})` }} ></div>
                    <div className="top-four-image" style={{ backgroundImage: `url(${usedImagesUrls[1]})` }} ></div>
                    <div className="top-four-image" style={{ backgroundImage: `url(${usedImagesUrls[2]})` }} ></div>
                    <div className="top-four-image" style={{ backgroundImage: `url(${usedImagesUrls[3]})` }} ></div>
                </div>
            </div>
            <div className="description-price-wrapper">
                <div className="description-wrapper">
                    <h3>{spotObj.name} hosted by {spotObj.Owner.firstName}</h3>
                    <div className="description">
                        {spotObj.description}
                    </div>
                </div>
                <div className="price-card">
                    <div className="price-card-header">
                        <div><span>${spotObj.price} </span>night</div>
                        <div className="price-card-reviews">
                            <h2><i className="fa-solid fa-star star" /> {spotObj.avgStarRating}</h2>
                            <h2> · </h2>
                            <h2>{spotObj.numReviews} reviews</h2>
                        </div>
                    </div>
                    <div className="dates-area" onClick={() => setIsOpen(true)}>
                        <div className="check-in">
                            <div className="check">CHECK-IN</div>
                            <div className="check-date">{start}</div>
                        </div>
                        <div className="check-out">
                            <div className="check">CHECK-OUT</div>
                            <div className="check-date">{end}</div>
                        </div>
                        {isOpen && <div onClick={(e) => e.stopPropagation()} className="booking-drop-down-wrapper">
                            <div className="drop-down-dates-area">
                                <div className="check-in inner-in">
                                    <div className="check">CHECK-IN</div>
                                    <div className="check-date">{dateState[0].startDate.toDateString()}</div>
                                </div>
                                <div className="check-out inner-out">
                                    <div className="check">CHECK-OUT</div>
                                    <div className="check-date">{dateState[0].endDate.toDateString()}</div>
                                </div>
                                <div className="calandar-buttons">
                                    <div className="calandar-button" onClick={() => {
                                        if (isChanged && dateState[0].startDate.toDateString() !== dateState[0].endDate.toDateString()) {
                                            setStart(dateState[0].startDate.toDateString())
                                            setEnd(dateState[0].endDate.toDateString())
                                            setNumNights(Math.ceil((Math.abs(dateState[0].endDate.getTime() - dateState[0].startDate.getTime())) / (1000 * 3600 * 24)))
                                            setIsOpen(false)
                                        }
                                    }}><i className="fa-solid fa-check" /></div>
                                    <div className="calandar-button" onClick={() => {
                                        setDateState([
                                            {
                                                startDate: new Date(),
                                                endDate: new Date(),
                                                key: 'selection'
                                            }
                                        ])
                                        setNumNights(false)
                                        setStart("Add date")
                                        setEnd("Add date")
                                        setIsChanged(false)
                                        setIsOpen(false)
                                    }}><i className="fa-solid fa-x" /></div>
                                </div>
                            </div>
                            <DateRange
                                rangeColors={["#FF5A60"]}
                                preventSnapRefocus={true}
                                editableDateInputs={true}
                                onChange={changeDateRange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateState}
                                disabledDay={disabledDates}
                                months={2}
                                direction="horizontal"
                                showDateDisplay={false}
                                minDate={tomorrow}
                            />

                        </div>}
                    </div>
                    {user && spotObj.ownerId !== user?.id && <button className="reserve-button" onClick={handleReserve}>Reserve</button>}
                    {!user && <button className="reserve-button" id="disabled-reserve-button" disabled={true}>Log in to Reserve</button>}
                    {spotObj.ownerId === user?.id && <button className="reserve-button" id="disabled-reserve-button" disabled={true}>Cannot Reserve your Spot</button>}
                    {numNights && <div className="price-calculations">
                        <div>
                            <p>${spotObj.price} X {numNights} nights</p>
                            <p>${(spotObj.price * numNights).toFixed(2)}</p>
                        </div>
                        <div>
                            <p>Cleaning fee</p>
                            <p>${(spotObj.price * .5).toFixed(2)}</p>
                        </div>
                        <div>
                            <p>Service fee</p>
                            <p>${(spotObj.price * .6).toFixed(2)}</p>
                        </div>
                        <div className="price-card-total">
                            <p>Total before Taxes</p>
                            <p>${(spotObj.price * .5 + spotObj.price * .6 + spotObj.price * numNights).toFixed(2)}</p>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="reviews-preview-wrapper">
                <div className="reviews-preview-header">
                    <h2><i className="fa-solid fa-star star header-star" /> {spotObj.avgStarRating}</h2>
                    <h2> · </h2>
                    <h2>{spotObj.numReviews} reviews</h2>
                    {!hasReview && user?.id && spotObj.ownerId !== user?.id && <CreateReviewFormModal />}
                </div>
                <div className='reviews-area-wrapper'>
                    {reviewsArr.map((review) => {
                        return <ReviewCard review={review} key={review.id} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default SpotDetails
