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

    return res.json(await ReviewImage.findByPk(image.id, {
        attributes: ['id', 'url']
    }))
})

router.put('/:reviewId', restoreUser, requireAuth, async (req, res, next) => {
    try {
        let editReview = await Review.findByPk(req.params.reviewId)

        if (!editReview) {
            res.status(404)
            return res.json({ message: "Review couldn't be found", statusCode: 404 })
        }

        if (editReview.userId !== req.user.id) {
            const err = new Error('Forbidden');
            err.title = 'Forbidden';
            return next(err);
        }


        const { review, stars } = req.body
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

        let newReview = await editReview.update({
            userId: req.user.id,
            review,
            stars,
        })

        return res.json(newReview)
    }
    catch (e) {
        return res.json(e)
    }
})

router.delete('/:reviewId', restoreUser, requireAuth, async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404)
        return res.json({ message: "Review couldn't be found", statusCode: 404 })
    }

    if (review.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    await review.destroy()

    return res.json({ message: 'Successfully deleted', statusCode: 200 })
})



module.exports = router;
