const fs = require('fs'); 
const util = require('util'); 


const readFile = util.promisify(fs.readFile)

class WriterService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).writers;
    }

    async getNames(){
        const data = await this.getData();

        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, waul:writer.waul};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, summary: writer.summary, waul:writer.waul};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, summary: writer.summary, waul:writer.waul};
        });
    }

    async getWriter(shortname){
        const data = await this.getData();
        const writer = data.find((writer)=> {
            return writer.shortname === shortname;
        });
        if(!writer) return null;
        
        return {
            name: writer.name,
            shortname: writer.shortname,
            description: writer.description, 
            summary: writer.summary, 
            waul:writer.waul
        }
    }

    async getBoxartForWriter(shortname){
        const data = await this.getData();
        const writer = data.find((writer) => {
            return writer.shortname === shortname;
        });

        if(!writer || !writer.boxart) return null; 
        return writer.boxart; 
    }

    async getAllBoxart(){

        const data = await this.getData();
        const boxarts = data.map((writer) => {
            return writer.boxart;
        });

        var allBoxart = [];

        boxarts.forEach(function(element) {
            allBoxart.push(...element);
        });
        return allBoxart;
    }
}
module.exports = WriterService;