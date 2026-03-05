const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { artistService } = param; 

    router.get('/', async(req, res, next) => {

        const artistslist = await artistService.getList();
        const allBoxart = await artistService.getAllBoxart();

        return res.render('artists', {page: 'All Artists', artistslist, boxart: allBoxart});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(artistService.getArtist(req.params.name)); 
            promises.push(artistService.getBoxartForArtist(req.params.name)); 
            const result = await Promise.all(promises) 

             
            if(!result[0]){
                return next();
            }

            return res.render('artistsDetail', {
                page: req.params.name, 
                artist: result[0],
                boxart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

