const path = require('path');
module.exports = {
    development: {
        sitename: 'Harry and Hermione [Development]',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            gallery: path.join(__dirname, 'data/gallery.json'),
            quotes: path.join(__dirname, 'data/quotes.json'),
            search: path.join(__dirname, 'data/search.json'),
            writers: path.join(__dirname, 'data/writers.json')
        }

    },
    production: {
        sitename: 'Harry and Hermione',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            gallery: path.join(__dirname, 'data/gallery.json'),
            quotes: path.join(__dirname, 'data/quotes.json'),
            search: path.join(__dirname, 'data/search.json'),
            writers: path.join(__dirname, 'data/writers.json')
        }
    }
}