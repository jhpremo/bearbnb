
function ReviewCard({ review }) {
    let postDate = new Date(review.createdAt)
    let year = postDate.getFullYear()
    let month = postDate.toLocaleString('default', { month: 'long' });
    return (
        <div className="review-card">
            <h2>{review.User.firstName}</h2>
            <h3>{month + " " + year}</h3>
            <p>{review.review}</p>
        </div>
    )
}

export default ReviewCard
