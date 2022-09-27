const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User } = require('../../db/models')

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

    let payload = getSpotsStarsAndPreview([spot], reviews, [])[0]

    payload.SpotImages = await SpotImage.findAll({
        where: { spotId },
        attributes: ['id', 'url', 'preview']
    })
    payload.Owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    return res.json(payload)

})


module.exports = router;
