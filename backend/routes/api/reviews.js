const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')
const { Op } = require('sequelize');
const router = express.Router();

router.get('/current', restoreUser, requireAuth, async (req, res) => {

    let userId = req.user.id
    let reviews = await Review.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        raw: true,
        nest: true
    })
    let reviewedSpots = []

    for (let i = 0; i < reviews.length; i++) {
        reviewedSpots.push(reviews[i].Spot.id)
    }


    let previewImages = await SpotImage.findAll({
        raw: true,
        attributes: ['spotId', 'url'],
        where: {
            preview: true,
            spotId: { [Op.in]: reviewedSpots }
        },
    })

    let firstPreviews = {}
    for (let i = 0; i < previewImages.length; i++) {
        if (!firstPreviews[previewImages[i].spotId]) {
            firstPreviews[previewImages[i].spotId] = previewImages[i].url
        }
    }

    for (let i = 0; i < reviews.length; i++) {
        if (firstPreviews[reviews[i].Spot.id]) {
            reviews[i].Spot.previewImage = firstPreviews[reviews[i].Spot.id]
        }
    }

    res.json({ Reviews: reviews })
})

router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId, {
        include: {
            model: ReviewImage,
            attributes: ['id']
        }
    })

    if (!review) {
        res.status(404)
        return res.json({ message: "Review couldn't be found", statusCode: 404 })
    }

    if (review.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    if (review.ReviewImages.length >= 10) {
        res.status(403)
        return res.json({ message: "Maximum number of images for this resource was reached", statusCode: 403 })
    }

    let url = req.body.url
    let image = await review.createReviewImage({
        url: url
    })

    res.json(await ReviewImage.findByPk(image.id, {
        attributes: ['id', 'url']
    }))
})
module.exports = router;
