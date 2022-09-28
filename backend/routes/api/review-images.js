const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')
const { Op } = require('sequelize');
const router = express.Router();


router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
    let image = await ReviewImage.findByPk(req.params.imageId)

    if (!image) {
        res.status(404)
        return res.json({ message: "Spot Image couldn't be found", statusCode: 404 })
    }

    let review = await Review.findByPk(image.reviewId)

    if (review.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        return next(err);
    }

    await image.destroy()

    return res.json({ message: 'Successfully deleted', statusCode: 200 })
})

module.exports = router;
