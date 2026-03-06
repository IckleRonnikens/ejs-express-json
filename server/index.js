const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');


const createErrors = require('http-errors');
const routes = require('./routes/routes');
const configs = require('./config'); 


const AboutService = require('./services/AboutService');  
const ArtistService = require('./services/ArtistService');  
const FeedbackService = require('./services/FeedbackService');  
const BlogService = require('./services/BlogService'); 
const QuotesService = require('./services/QuotesService'); 
const GalleryService = require('./services/GalleryService'); 
const SearchService = require('./services/SearchService'); 
const WriterService = require('./services/WriterService');  



const app = express(); 
const config = configs[app.get('env')]; 


const aboutService = new AboutService(config.data.about); 
const artistService = new ArtistService(config.data.artists); 
const blogService = new BlogService(config.data.blog); 
const feedbackService = new FeedbackService(config.data.feedback); 
const quotesService = new QuotesService(config.data.quotes); 
const galleryService = new GalleryService(config.data.gallery); 
const searchService = new SearchService(config.data.search); 
const writerService = new WriterService(config.data.writers); 



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

app.use(async (req, res, next) => {
    try {
        const names = await artistService.getNames();
        res.locals.artistNames = names;
        return next();
    }catch(err){
        return next(err);
    }
});

app.use(async (req, res, next) => {
    try {
        const names = await writerService.getNames();
        res.locals.writerNames = names;
        return next();
    }catch(err){
        return next(err);
    }
});

//Passes the services as a param to the routes
app.use('/', routes({
    aboutService: aboutService,
    artistService: artistService,
    feedbackService: feedbackService,
    blogService: blogService,
    quotesService: quotesService,
    galleryService: galleryService,
    searchService: searchService,
    writerService: writerService
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


