const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { artistService } = param; 
    const { quotesService } = param;

    router.get('/', async(req, res, next) => {
        const artistslist = await artistService.getList();
        const quoteslist = await quotesService.getList();
        const allBoxart = await artistService.getAllBoxart();
        return res.render('quotes', {page: 'Quotes', artistslist, quoteslist, boxart: allBoxart});

    });

    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(quotesService.getQuotesDetail(req.params.name)); 
            const result = await Promise.all(promises) 
            console.log(result[0])
            if(!result[0]){
                return next();
            }

            return res.render('quotesDetail', {
                page: req.params.name, 
                quotesDetail: result[0],
                boxart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

