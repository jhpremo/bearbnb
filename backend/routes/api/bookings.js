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





module.exports = router;
