const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const e = require('express');

const router = express.Router();

let getSpotsStarsAndPreview = (spots, reviews, previewImages) => {
    let totalStars = {}

    for (let i = 0; i < reviews.length; i++) {
        let spotId = reviews[i].spotId
        if (totalStars[spotId]) {
            totalStars[spotId] += reviews[i].stars
            totalStars[`${spotId} count`]++
        } else {
            totalStars[spotId] = reviews[i].stars
            totalStars[`${spotId} count`] = 1
        }
    }


    let firstPreviews = {}
    for (let i = 0; i < previewImages.length; i++) {
        if (!firstPreviews[previewImages[i].spotId]) {
            firstPreviews[previewImages[i].spotId] = previewImages[i].url
        }
    }

    for (let i = 0; i < spots.length; i++) {
        let spotId = spots[i].id
        if (totalStars[spotId]) spots[i].avgStarRating = totalStars[spotId] / totalStars[`${spotId} count`]
        if (firstPreviews[spotId]) spots[i].previewImage = firstPreviews[spotId]
    }

    return spots
}



router.get('/', async (req, res) => {

    let reviews = await Review.findAll({
        raw: true,
        attributes: ['spotId', 'stars']
    })

    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true
        }
    })

    let spots = await Spot.findAll({ raw: true })


    let payload = { Spots: getSpotsStarsAndPreview(spots, reviews, previewImages) }
    return res.json(payload)
})

router.get('/current', restoreUser, requireAuth, async (req, res) => {

    let ownerId = req.user.id

    let reviews = await Review.findAll({
        raw: true,
        attributes: ['spotId', 'stars'],
        include: {
            model: Spot,
            attributes: [],
            where: {
                ownerId
            }
        }
    })

    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true
        },
        include: {
            model: Spot,
            attributes: [],
            where: {
                ownerId
            }
        }
    })

    let spots = await Spot.findAll({
        raw: true,
        where: {
            ownerId
        }
    })


    let payload = { Spots: getSpotsStarsAndPreview(spots, reviews, previewImages) }
    return res.json(payload)
})

router.get('/:spotId', async (req, res) => {
    let spotId = req.params.spotId


    let reviews = await Review.findAll({
        raw: true,
        attributes: ['spotId', 'stars'],
        where: {
            spotId
        }
    })


    let spot = await Spot.findByPk(spotId, {
        raw: true,
    })

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    let payload = getSpotsStarsAndPreview([spot], reviews, [])[0]

    payload.numReviews = reviews.length
    payload.SpotImages = await SpotImage.findAll({
        where: { spotId },
        attributes: ['id', 'url', 'preview']
    })
    payload.Owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    return res.json(payload)

})

router.post('/', restoreUser, requireAuth, async (req, res) => {
    let userId = req.user.id
    let { address, city, state, country, lat, lng, name, description, price } = req.body

    let errors = {}

    if (!address) errors.address = "Street address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (!country) errors.country = "Country is required"
    if (!lat || lat < -90 || lat > 90) errors.lat = "Latitude is not valid"
    if (!lng || lng < -180 || lng > 180) errors.lng = "Longitude is not valid"
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters"
    if (!description) errors.description = "Description is required"
    if (!price) errors.price = "Price per day is required"

    if (Object.keys(errors).length) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    let owner = await User.findByPk(userId)

    let payload = await owner.createSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(payload)
})

router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    let { url, preview } = req.body
    let image = await spot.createSpotImage({
        url,
        preview
    })

    return res.json(await SpotImage.findByPk(image.id))
})

router.put('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }


    let { address, city, state, country, lat, lng, name, description, price } = req.body
    let errors = {}

    if (!address) errors.address = "Street address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (!country) errors.country = "Country is required"
    if (!lat || lat < -90 || lat > 90) errors.lat = "Latitude is not valid"
    if (!lng || lng < -180 || lng > 180) errors.lng = "Longitude is not valid"
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters"
    if (!description) errors.description = "Description is required"
    if (!price) errors.price = "Price per day is required"

    if (Object.keys(errors).length) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(spot)
})

router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    await spot.destroy()

    return res.json({ message: 'Successfully deleted', statusCode: 200 })
})

router.get('/:spotId/reviews', async (req, res) => {
    let spotId = req.params.spotId
    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    let reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
        raw: true,
        nest: true
    })

    for (let i = 0; i < reviews.length; i++) {
        let ReviewImages = await ReviewImage.findAll({
            where: {
                reviewId: reviews[i].id
            }
        })

        if (ReviewImages.length) {
            reviews[i].ReviewImages = ReviewImages
        }
    }

    return res.json({ Reviews: reviews })
})

router.post('/:spotId/reviews', restoreUser, requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const spotId = req.params.spotId

    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    let prevReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId
        }
    })

    if (prevReview) {
        res.status(403)
        return res.json({ message: "User already has a review for this spot", statusCode: 403 })
    }

    let errors = {}

    if (!review) errors.review = "Review text is required"
    if (!stars || parseInt(stars) < 1 || parseInt(stars) > 5 || !Number.isInteger(stars)) errors.stars = "Stars must be an integer from 1 to 5"

    if (Object.keys(errors).length) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    let newReview = await spot.createReview({
        userId: req.user.id,
        review,
        stars,
    })


    return res.json(newReview)
})

router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const spotId = req.params.spotId

    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    let bookings

    if (spot.ownerId === req.user.id) {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            raw: true,
            nest: true
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['spotId', 'startDate', 'endDate'],
            raw: true,
            nest: true
        })
    }

    console.log(bookings)
    res.json({ Bookings: bookings })
})

router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId

    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId === req.user.id) {
        return res.json({ message: "cannot book a spot that you own" })
    }

    const { startDate, endDate } = req.body

    let start = new Date(startDate)
    let end = new Date(endDate)
    let now = new Date()
    let errors = {}

    if (start <= now) errors.booking = "Booking cannot be set before or on current date"
    if (start >= end) {
        errors.endDate = "endDate cannot be on or before startDate"
    }

    let bookings = await Booking.findAll({
        where: {
            spotId
        },
        attributes: ['spotId', 'startDate', 'endDate'],
        raw: true,
        nest: true
    })

    if (Object.keys(errors).length) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    for (let i = 0; i < bookings.length; i++) {
        let bookingStart = new Date(bookings[i].startDate)
        let bookingEnd = new Date(bookings[i].endDate)

        if (start <= bookingEnd && start >= bookingStart) {
            errors.startDate = "Start date conflicts with an existing booking"
        }

        if (end <= bookingEnd && end >= bookingStart) {
            errors.endDate = "End date conflicts with an existing booking"
        }
    }

    if (Object.keys(errors).length) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors
        })
    }


    let booking = await spot.createBooking({
        userId: req.user.id,
        startDate,
        endDate
    })


    res.json(booking)
})



module.exports = router;
