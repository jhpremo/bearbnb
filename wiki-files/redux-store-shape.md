# Redux Store Shape

    store = {
    session: {},
    spots: {
        allSpots: {
        [spotId]: {
            spotData,
        },
        },
        singleSpot: {
        spotData,
        SpotImages: [imagesData],
        Owner: {
            ownerData,
        },
        },
    },
    reviews: {
        spot: {
        [reviewId]: {
            reviewData,
            User: {
            userData,
            },
            ReviewImages: [imagesData],
        },
        },
        user: {
        [reviewId]: {
            reviewData,
            User: {
            userData,
            },
            Spot: {
            spotData,
            },
            ReviewImages: [imagesData],
        },
        },
    },
    bookings: {
        user: {
        [bookingId]: {
            bookingData,
            Spot: {
            spotData,
            },
        },
        optionalOrderedList: [],
        },
        spot: {
        [bookingId]: {
            bookingData,
        },
        optionalOrderedList: [],
        },
    },
    };
