const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models')
const { Op } = require('sequelize');


const router = express.Router();

router.get('/current', restoreUser, requireAuth, async (req, res) => {

    let userId = req.user.id
    let bookings = await Booking.findAll({
        where: {
            userId
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        raw: true,
        nest: true
    })
    console.log(bookings[0].Spot.id)
    let bookedSpots = []

    for (let i = 0; i < bookings.length; i++) {
        bookedSpots.push(bookings[i].Spot.id)
    }


    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true,
            spotId: { [Op.in]: bookedSpots }
        },
    })

    let firstPreviews = {}
    for (let i = 0; i < previewImages.length; i++) {
        if (!firstPreviews[previewImages[i].spotId]) {
            firstPreviews[previewImages[i].spotId] = previewImages[i].url
        }
    }


    for (let i = 0; i < bookings.length; i++) {
        if (firstPreviews[bookings[i].Spot.id]) {
            bookings[i].Spot.previewImage = firstPreviews[bookings[i].Spot.id]
        }
    }


    return res.json({ Bookings: bookings })
})

router.put('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {
    let booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        res.status(404)
        return res.json({ message: "Booking couldn't be found", statusCode: 404 })
    }

    if (booking.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    const { startDate, endDate } = req.body

    let start = new Date(startDate)
    let end = new Date(endDate)
    let now = new Date()

    let errors = {}

    let checkBooking = booking = await Booking.findByPk(req.params.bookingId, {
        raw: true,
        nest: true
    })
    if (new Date(checkBooking.endDate) < now) {
        res.status(403),
            returnres.json({ message: "Past bookings can't be modified", statusCode: 403 })
    }

    if (start <= now) errors.booking = "Booking cannot be set before or on current date"
    if (start >= end) {
        errors.endDate = "endDate cannot be on or before startDate"
    }

    let bookings = await Booking.findAll({
        where: {
            spotId: {
                [Op.is]: booking.spotId,
            },
            id: {
                [Op.not]: req.params.bookingId
            }
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

    booking = await Booking.findByPk(req.params.bookingId)
    await booking.update({
        startDate,
        endDate
    })


    res.json(booking)
})

router.delete('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {
    let booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    })

    if (!booking) {
        res.status(404)
        return res.json({ message: "Booking couldn't be found", statusCode: 404 })
    }

    let checkBooking = booking = await Booking.findByPk(req.params.bookingId, {
        raw: true,
        nest: true
    })
    let now = new Date()
    if (new Date(checkBooking.startDate) <= now) {
        res.status(403),
            returnres.json({ message: "Bookings that have been started can't be deleted", statusCode: 403 })
    }

    if (booking.userId !== req.user.id && booking.Spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    booking = await Booking.findByPk(req.params.bookingId, {
    })
    await booking.destroy()

    return res.json({ message: 'Successfully deleted', statusCode: 200 })
})

module.exports = router;
