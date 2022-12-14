import "./SpotCard.css"
import { useHistory } from "react-router-dom"
function SpotCard({ spot }) {
    const history = useHistory()
    return (
        <div className="spot-card" onClick={() => {
            history.push(`/spots/${spot.id}`)
        }}>
            <div className="spot-image" style={{ backgroundImage: `url(${spot.previewImage})` }}></div>
            <div className="location-rating">
                <div id="spot-card-location">{`${spot.city}, ${spot.state}`}</div>
                <div><i className="fa-solid fa-star star" /> {spot.avgStarRating}</div>
            </div>
            <div className="spot-card-price">${spot.price} night</div>
        </div >
    )
}

export default SpotCard
