const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class ReviewService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).reviews;
    }

    async getList(){
        const data = await this.getData();
        return data.map((review) => {
            return {name:review.name, shortname: review.shortname, title: review.title, summary: review.summary, image: review.image, genre: review.genre, developer: review.developer, publisher: review.publisher, releasedate: review.releasedate, rating: review.rating};
        });
    }

    async getReviewDetail(shortname){
        const data = await this.getData();
        const review = data.find((review)=> {
            return review.shortname === shortname;
        });
        if(!review) return null;

        return {
            title: review.title,
            name: review.name,
            shortname: review.shortname,
            summary: review.summary,
            description: review.description,
            image: review.image,
            genre: review.genre, 
            developer: review.developer, 
            publisher: review.publisher, 
            releasedate: review.releasedate,
            rating: review.rating
        }
    }
}

module.exports = ReviewService;