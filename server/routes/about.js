const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { aboutService } = param; //Deconstructs the param

    router.get('/', async(req, res, next) => {

        //Loads the data from the speakersService class
        const aboutlist = await aboutService.getList();
        
        return res.render('about', {page: 'About', aboutlist});

    });

    return router; 
};

