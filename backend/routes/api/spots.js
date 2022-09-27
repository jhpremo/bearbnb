const express = require('express')

const { Spot, Review, SpotImage, sequelize } = require('../../db/models')

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
        spots[i].avgStarRating = totalStars[spotId] / totalStars[`${spotId} count`]
        spots[i].previewImage = firstPreviews[spotId]
    }

    return spots
}



router.get('/', async (req, res) => {

    let reviews = await Review.findAll({ raw: true, attributes: ['spotId', 'stars'] })

    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true
        }
    })

    let spots = await Spot.findAll({ raw: true })


    let payload = { Spots: getSpotsStarsAndPreview(spots, reviews, previewImages) }
    res.json(payload)
})

module.exports = router;
