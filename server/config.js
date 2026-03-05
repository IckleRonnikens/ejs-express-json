const path = require('path');
module.exports = {
    development: {
        sitename: 'Harry and Hermione [Development]',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            gamers: path.join(__dirname, 'data/gamers.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            review: path.join(__dirname, 'data/review.json'),
            goty: path.join(__dirname, 'data/goty.json'),
            users: path.join(__dirname, 'data/users.json'),
            gallery: path.join(__dirname, 'data/gallery.json')
        }

    },
    production: {
        sitename: 'Harry and Hermione',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            gamers: path.join(__dirname, 'data/gamers.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            review: path.join(__dirname, 'data/review.json'),
            goty: path.join(__dirname, 'data/goty.json'),
            users: path.join(__dirname, 'data/users.json'),
            gallery: path.join(__dirname, 'data/gallery.json')

        }
    }
}