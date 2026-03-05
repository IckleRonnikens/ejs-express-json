
const express = require('express'); 
const aboutRoutes = require('./about'); 
const artistsRoutes = require('./artists'); 
const feedbackRoutes = require('./feedback');
const blogRoutes = require('./blog');
const quotesRoutes = require('./quotes');
const galleryRoutes = require('./gallery');
const searchRoutes = require('./search');
const writersRoutes = require('./writers'); 



const router = express.Router();

module.exports = (param) => {

    const { artistService } = param; 
    const { writerService } = param; 


    router.get('/', async(req, res, next) => {

        const artistslist = await artistService.getListShort();
        const writerslist = await writerService.getListShort();
        return res.render('index', {page: 'Home', artistslist, writerslist});
        
    });

    router.use('/about', aboutRoutes(param));
    router.use('/artists', artistsRoutes(param));
    router.use('/feedback', feedbackRoutes(param));
    router.use('/blog', blogRoutes(param));
    router.use('/quotes', quotesRoutes(param));
    router.use('/gallery', galleryRoutes(param));
    router.use('/search', searchRoutes(param));
    router.use('/writers', writersRoutes(param));



    return router;
};

