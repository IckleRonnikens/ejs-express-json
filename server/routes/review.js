const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { reviewService } = param;

    router.get('/', async(req, res, next) => {
        const gamerslist = await gamerService.getList();
        const reviewlist = await reviewService.getList();
        const allBoxart = await gamerService.getAllBoxart();
        return res.render('review', {page: 'Reviews', gamerslist, reviewlist, boxart: allBoxart});

    });

    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(reviewService.getReviewDetail(req.params.name)); 
            const result = await Promise.all(promises) 
            console.log(result[0])
            if(!result[0]){
                return next();
            }

            return res.render('reviewDetail', {
                page: req.params.name, 
                reviewDetail: result[0],
                boxart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

