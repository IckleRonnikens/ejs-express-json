const fs = require('fs'); 
const util = require('util'); 


const readFile = util.promisify(fs.readFile)

class ArtistService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).artists;
    }

    async getNames(){
        const data = await this.getData();

        return data.map((artist) => {
            return {name:artist.name, shortname: artist.shortname, artisttag:artist.artisttag};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((artist) => {
            return {name:artist.name, shortname: artist.shortname, summary: artist.summary, artisttag:artist.artisttag};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((artist) => {
            return {name:artist.name, shortname: artist.shortname, summary: artist.summary, artisttag:artist.artisttag};
        });
    }

    async getArtist(shortname){
        const data = await this.getData();
        const artist = data.find((artist)=> {
            return artist.shortname === shortname;
        });
        if(!artist) return null;
        
        return {
            name: artist.name,
            shortname: artist.shortname,
            description: artist.description, 
            summary: artist.summary, 
            artisttag:artist.artisttag
        }
    }

    async getBoxartForArtist(shortname){
        const data = await this.getData();
        const artist = data.find((artist) => {
            return artist.shortname === shortname;
        });

        if(!artist || !artist.boxart) return null; 
        return artist.boxart; 
    }

    async getAllBoxart(){

        const data = await this.getData();
        const boxarts = data.map((artist) => {
            return artist.boxart;
        });

        var allBoxart = [];

        boxarts.forEach(function(element) {
            allBoxart.push(...element);
        });
        return allBoxart;
    }
}
module.exports = ArtistService;