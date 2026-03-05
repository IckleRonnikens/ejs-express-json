const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class QuotesService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).quotes;
    }

    async getList(){
        const data = await this.getData();
        return data.map((quotes) => {
            return {second: quotes.second, third: quotes.third, shortname: quotes.shortname, title: quotes.title, summary: quotes.summary, image: quotes.image, genre: quotes.genre, developer: quotes.developer, publisher: quotes.publisher, releasedate: quotes.releasedate, rating: quotes.rating};
        });
    }

    async getQuotesDetail(shortname){
        const data = await this.getData();
        const quotes = data.find((quotes)=> {
            return quotes.shortname === shortname;
        });
        if(!quotes) return null;

        return {
            title: quotes.title,
            second: quotes.second,
            third: quotes.third,
            shortname: quotes.shortname,
            description: quotes.description,
            image: quotes.image,
            genre: quotes.genre, 
            developer: quotes.developer, 
            publisher: quotes.publisher, 
            releasedate: quotes.releasedate,
            rating: quotes.rating
        }
    }
}

module.exports = QuotesService;