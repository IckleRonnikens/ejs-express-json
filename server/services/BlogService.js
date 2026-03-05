const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class BlogService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).blogs;
    }

    async getList(){
        const data = await this.getData();
        return data.map((blog) => {
            return {name:blog.name, shortname: blog.shortname, title: blog.title, summary: blog.summary, image: blog.image, genre: blog.genre, developer: blog.developer, publisher: blog.publisher, releasedate: blog.releasedate, rating: blog.rating};
        });
    }

    async getBlogDetail(shortname){
        const data = await this.getData();
        const blog = data.find((blog)=> {
            return blog.shortname === shortname;
        });
        if(!blog) return null;

        return {
            title: blog.title,
            name: blog.name,
            shortname: blog.shortname,
            summary: blog.summary,
            description: blog.description,
            image: blog.image,
            genre: blog.genre, 
            developer: blog.developer, 
            publisher: blog.publisher, 
            releasedate: blog.releasedate,
            rating: blog.rating
        }
    }
}

module.exports = BlogService;