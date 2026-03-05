const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class SearchService {

    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).search;
    }

    async getNames(){
        const data = await this.getData();

        return data.map((search) => {
            return {};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((search) => {
            return {};
        });
    }








}
module.exports = SearchService;