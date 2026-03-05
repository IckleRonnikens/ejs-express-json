const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { galleryService } = param; 

    router.get('/', async(req, res, next) => {


        const galleryslist = await galleryService.getList();
        const allScreenshot = await galleryService.getAllScreenshot();
        return res.render('gallery', {page: 'Gallery', galleryslist, screenshot: allScreenshot});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(galleryService.getGallery(req.params.name)); 
            promises.push(galleryService.getScreenshotForGallery(req.params.name));
            const result = await Promise.all(promises) 

            if(!result[0]){
                return next();
            }

            return res.render('galleryDetail', {
                page: req.params.name, 
                gallery: result[0],
                screenshot: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

