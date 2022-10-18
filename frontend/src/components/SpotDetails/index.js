import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneSpotThunk } from "../../store/spotsReducer";
import { useEffect, useState } from "react";
import EditSpotFormModal from "../EditSpotModal";
import "./SpotDetails.css"
import DeleteSpotFormModal from "../DeleteSpotModal";

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    useEffect(() => {
        dispatch(fetchOneSpotThunk(spotId))
    }, [dispatch, spotId])

    const spotObj = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session.user)
    if (spotObj && !spotObj.name) {
        return <></>
    }

    let usedImagesUrls = []
    let previewImageUrl

    for (let i = 0; i < spotObj.SpotImages.length; i++) {
        let image = spotObj.SpotImages[i]
        if (image.preview) previewImageUrl = image.url
        else {
            usedImagesUrls.push(image.url)
        }
        if (usedImagesUrls.length >= 4 && previewImageUrl) break
    }


    return (
        <div className="spot-details-wrapper">
            <div className="spot-title-bar">
                <h1>{spotObj.name}</h1>
                {spotObj.ownerId === user.id &&
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
                        <div>${spotObj.price} night</div>
                        <div className="price-card-reviews">
                            <h2><i className="fa-solid fa-star star" /> {spotObj.avgStarRating}</h2>
                            <h2> · </h2>
                            <h2>{spotObj.numReviews} reviews</h2>
                        </div>
                    </div>
                    <div className="price-calculations">
                        <div>
                            <p>${spotObj.price} X 7 nights</p>
                            <p>${spotObj.price * 7}</p>
                        </div>
                        <div>
                            <p>Cleaning fee</p>
                            <p>${spotObj.price * .5}</p>
                        </div>
                        <div>
                            <p>Service fee</p>
                            <p>${spotObj.price * .6}</p>
                        </div>
                        <div>
                            <p>Total before Taxes</p>
                            <p>${spotObj.price * .5 + spotObj.price * .6 + spotObj.price * 7}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails
