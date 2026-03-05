const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class PersonaliseService {
  constructor(datafile) {
    this.datafile = datafile;
  }
  async getList() {
    const data = await this.getData();
    return data;
  }
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }

  async getUsersFavouriteGamer(shortname){
    const data = await this.getData();
    const user = data.users.find((user) => {
        return user.shortname === 'James';
    });

    if(!user || !user.mostviewedGamer) return null;
    return user.mostviewedGamer; 
  }
}

module.exports = PersonaliseService;