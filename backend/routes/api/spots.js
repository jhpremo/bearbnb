const express = require('express')

const { Spot, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();


router.get('/', async (req, res) => {

    let reviews = await Review.findAll({ raw: true, attributes: ['spotId', 'stars'] })
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

    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true
        }
    })
    let firstPreviews = {}
    for (let i = 0; i < previewImages.length; i++) {
        if (!firstPreviews[previewImages[i].spotId]) {
            firstPreviews[previewImages[i].spotId] = previewImages[i].url
        }
    }

    let spots = await Spot.findAll({ raw: true })
    for (let i = 0; i < spots.length; i++) {
        let spotId = spots[i].id
        spots[i].avgStarRating = totalStars[spotId] / totalStars[`${spotId} count`]
        spots[i].previewImage = firstPreviews[spotId]
    }

    let payload = { Spots: spots }
    res.json(payload)
})


module.exports = router;
