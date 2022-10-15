import "./SpotCard.css"

function SpotCard({ spot }) {
    return (
        <div className="spot-card">
            <div className="spot-image" style={{ backgroundImage: `url(${spot.previewImage})` }}></div>
            <div className="location-rating">
                <div>{`${spot.city}, ${spot.state}`}</div>
                <div><i class="fa-solid fa-star star" /> {spot.avgStarRating}</div>
            </div>
            <div>${spot.price} night</div>
        </div >
    )
}

export default SpotCard
