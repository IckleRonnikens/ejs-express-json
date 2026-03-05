
const express = require('express'); 
const aboutRoutes = require('./about'); 
const gamersRoutes = require('./gamers'); 
const feedbackRoutes = require('./feedback');
const blogRoutes = require('./blog');
const gotyRoutes = require('./goty');
const galleryRoutes = require('./gallery');
const searchRoutes = require('./search');



const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { personaliseService } = param; 


    router.get('/', async(req, res, next) => {

        const gamerslist = await gamerService.getListShort();
        const usersFavouriteGamer = await personaliseService.getUsersFavouriteGamer("James");
        const favouriteGamerBoxart = await gamerService.getBoxartForGamer(usersFavouriteGamer);
        return res.render('index', {page: 'Home', gamerslist, boxart: favouriteGamerBoxart});
        
    });

    router.use('/about', aboutRoutes(param));
    router.use('/gamers', gamersRoutes(param));
    router.use('/feedback', feedbackRoutes(param));
    router.use('/blog', blogRoutes(param));
    router.use('/goty', gotyRoutes(param));
    router.use('/gallery', galleryRoutes(param));
    router.use('/search', searchRoutes(param));



    return router;
};

