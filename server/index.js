const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');


const createErrors = require('http-errors');
const routes = require('./routes/routes');
const configs = require('./config'); //Loads the config data


const AboutService = require('./services/AboutService');  //Loads the gamer services module
const GamerService = require('./services/GamerService');  //Loads the gamer services module
const FeedbackService = require('./services/FeedbackService');  //Loads the feedback services module
const ReviewService = require('./services/ReviewService'); //Loads the review services module
const GotyService = require('./services/GotyService'); //Loads the goty services module
const GalleryService = require('./services/GalleryService'); //Loads the gallery services module
const PersonaliseService = require('./services/PersonaliseService'); //Loads the personalise services module


const app = express(); 
const config = configs[app.get('env')]; //Loads the config for production or development depending on the env


const aboutService = new AboutService(config.data.about); //Creates a new services and passes in the url for the data from the config
const gamerService = new GamerService(config.data.gamers); //Creates a new services and passes in the url for the data from the config
const reviewService = new ReviewService(config.data.review); //Creates a new services and passes in the url for the data from the config
const feedbackService = new FeedbackService(config.data.feedback); //Creates a new services and passes in the url for the data from the config
const gotyService = new GotyService(config.data.goty); //Creates a new services and passes in the url for the data from the config
const galleryService = new GalleryService(config.data.gallery); //Creates a new services and passes in the url for the data from the config
const personaliseService = new PersonaliseService(config.data.users); //Creates a new services and passes in the url for the data from the config


app.set('view engine', 'ejs');
if(app.get('env') === 'development'){
    app.locals.pretty = true;
}

app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204); 
});
//Gets the gamers names for the menu
app.use(async (req, res, next) => {
    try {
        const names = await gamerService.getNames();
        res.locals.gamerNames = names;
        return next();
    }catch(err){
        return next(err);
    }
});

//Passes the services as a param to the routes
app.use('/', routes({
    aboutService: aboutService,
    gamerService: gamerService,
    feedbackService: feedbackService,
    reviewService: reviewService,
    gotyService: gotyService,
    personaliseService: personaliseService,
    galleryService: galleryService
}));



app.use((req, res, next) => {
    return next(createErrors(404, 'File not found'))
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === "development" ? err : {};
    res.status(status);
    return res.render('error');
});

// app.listen(process.env.PORT) // Listens to the PORT environment - this is for deployment mode only
// Listens on port 3000
app.listen(3000) 

module.export = app; // Exports the app instance so that it can be accessed by other scripts


