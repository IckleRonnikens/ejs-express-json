const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class GotyService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).gotys;
    }

    async getList(){
        const data = await this.getData();
        return data.map((goty) => {
            return {second: goty.second, third: goty.third, shortname: goty.shortname, title: goty.title, summary: goty.summary, image: goty.image, genre: goty.genre, developer: goty.developer, publisher: goty.publisher, releasedate: goty.releasedate, rating: goty.rating};
        });
    }

    async getGotyDetail(shortname){
        const data = await this.getData();
        const goty = data.find((goty)=> {
            return goty.shortname === shortname;
        });
        if(!goty) return null;

        return {
            title: goty.title,
            second: goty.second,
            third: goty.third,
            shortname: goty.shortname,
            description: goty.description,
            image: goty.image,
            genre: goty.genre, 
            developer: goty.developer, 
            publisher: goty.publisher, 
            releasedate: goty.releasedate,
            rating: goty.rating
        }
    }
}

module.exports = GotyService;