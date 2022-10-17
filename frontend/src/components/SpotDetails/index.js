import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneSpotThunk } from "../../store/spotsReducer";
import { useEffect } from "react";
import "./SpotDetails.css"

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(fetchOneSpotThunk(spotId))
    }, [dispatch, spotId])

    const spotObj = useSelector((state) => state.spots.singleSpot)

    if (!spotObj.name) return <></>

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
            <h1>{spotObj.name}</h1>
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
                <h3>Hosted by {spotObj.Owner.firstName}</h3>
                <div className="description">
                    {spotObj.description}
                </div>
            </div>
        </div>
    )
}

export default SpotDetails
