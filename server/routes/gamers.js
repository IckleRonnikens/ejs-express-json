const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; //Deconstructs the param

    router.get('/', async(req, res, next) => {

        //Loads the data from the speakersService class
        const gamerslist = await gamerService.getList();
        const allBoxart = await gamerService.getAllBoxart();
        //Selects the page to render and passes the data for the page as JSON
        return res.render('gamers', {page: 'All Gamers', gamerslist, boxart: allBoxart});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; //Creates a empty array
            promises.push(gamerService.getGamer(req.params.name)); //This pushes our first promise into the empty array
            promises.push(gamerService.getBoxartForGamer(req.params.name)); //This pushes our second promise into the array
            const result = await Promise.all(promises) //This waits for both promises to finish and returns the result in an array

             //If the no data is returned 
            if(!result[0]){
                return next();
            }

            //Renders the page and passes in the data as JSON
            return res.render('gamersDetail', {
                page: req.params.name, 
                gamer: result[0],
                boxart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

