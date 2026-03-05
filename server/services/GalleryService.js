const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class GalleryService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).gallerys;
    }

    async getNames(){
        const data = await this.getData();
        return data.map((gallery) => {
            return {name:gallery.name, shortname: gallery.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((gallery) => {
            return {name:gallery.name, shortname: gallery.shortname, title: gallery.title, summary: gallery.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((gallery) => {
            return {name:gallery.name, shortname: gallery.shortname, title: gallery.title};
        });
    }

    async getGallery(shortname){
        const data = await this.getData();
        const gallery = data.find((gallery)=> {
            return gallery.shortname === shortname;
        });
        if(!gallery) return null;

        return {
            title: gallery.title,
            name: gallery.name,
            shortname: gallery.shortname,
            description: gallery.description,
        }
    }

    async getScreenshotForGallery(shortname){
        const data = await this.getData();
        const gallery = data.find((gallery) => {
            return gallery.shortname === shortname;
        });

        if(!gallery || !gallery.screenshot) return null; 
        return gallery.screenshot; 
    }

    async getAllScreenshot(){

        const data = await this.getData();
        const screenshots = data.map((gallery) => {
            return gallery.screenshot;
        });

        var allScreenshot = [];

        screenshots.forEach(function(element) {
            allScreenshot.push(...element);
        });
        
        return allScreenshot;
    }
}

module.exports = GalleryService;