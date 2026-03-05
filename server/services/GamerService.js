const fs = require('fs'); //We will need to load files so we need the node file module
const util = require('util'); //We need to use one of nodes utilities so load the node utility module
//This creates a promise ready read file function
//Example
//var promise = doSomethingAync()
//promise.then(onFulfilled, onRejected)

//"doSomethingAync" is any callback or asynchronous function which does some sort of processing.
///This time, when defining the callback, there is a value which is returned called a "promise."
//When a promise is returned, it can have 2 outputs. This is defined by the 'then clause'. 
//Either the operation can be a success which is denoted by the 'onFulfilled' parameter. 
//Or it can have an error which is denoted by the 'onRejected' parameter.

//In short await requires a promise: const data = await readFile(this.datafile, 'utf8');
//It needs to know it will definitely get something back either success or failure


const readFile = util.promisify(fs.readFile)

//Class name
class GamerService {
    //Class constructor this is the first function called when we create a new instance of this class
    //When this constructor is called it will require a data file to be passed in.
    constructor(datafile){

        this.datafile = datafile;
    }
    // If we use await in a function we need to decorate that function with async
    // This indicates that our code is async to the complier
    async getData(){
        //The application awaits the response from the readfile function and stores the returned data
        const data = await readFile(this.datafile, 'utf8');
        //If no data is returned then we will return an empty array
        if(!data) {
            return [];
        }
        //Parses that data into a JavaScript object and gets the property gamers and returns the data
        return JSON.parse(data).gamers;
    }

    // Gets just the names of the gamers
    async getNames(){
        // Awaits the data from the getData function
        const data = await this.getData();

        //The map() method creates a new array with the results of calling a provided function on every element in the calling array.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        //This creates a new array with just the name and shortname data
        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, gamertag:gamer.gamertag};
        });
    }

    //This will get the data for the all gamers page
    async getList(){
        const data = await this.getData();
        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, title: gamer.title, summary: gamer.summary, gamertag:gamer.gamertag};
        });
    }

    //Returns an array that contains the gamers names, shotnames, title
    async getListShort(){
        const data = await this.getData();
        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, title: gamer.title, summary: gamer.summary, gamertag:gamer.gamertag};
        });
    }

    //Takes a gamers shortname as a param and searches the data for a match
    async getGamer(shortname){
        const data = await this.getData();
        //Searches for a matching shortname
        const gamer = data.find((gamer)=> {
            return gamer.shortname === shortname;
        });
        if(!gamer) return null;
        
        //Returns the data if a match is found
        return {
            title: gamer.title,
            name: gamer.name,
            shortname: gamer.shortname,
            description: gamer.description, 
            summary: gamer.summary, 
            gamertag:gamer.gamertag
        }
    }

    //Takes a gamers shortname as a param and searches the data for a match and returns the gamers boxart
    async getBoxartForGamer(shortname){
        const data = await this.getData();
        const gamer = data.find((gamer) => {
            return gamer.shortname === shortname;
        });

        if(!gamer || !gamer.boxart) return null; //If no match was found
        return gamer.boxart; //Returns boxart if a match was found
    }

    //This function gets all the boxart
    async getAllBoxart(){

        //Get all the data
        const data = await this.getData();
        //Remap the data to a new array
        const boxarts = data.map((gamer) => {
            return gamer.boxart;
        });
        //now we have an array called boxart with 3 nested arrays inside inside it.
        //we need to merge this into one big array with no nested arrays as this is what the boxart pug file is expecting 

        //9. Create a variable to store all the boxart
        var allBoxart = [];
        //Option 1 
        /*boxart.forEach(function(element) {
            element.forEach(function(element) {
                allboxart.push(element);
            });

        });*/
        //Option 2
        boxarts.forEach(function(element) {
            // ... infront of the array name grabs the elements out of the array and allows us to push them to a new array
            // if we don this allboxart.push(element) this would push the whole array into the allboxart array resulting in arrays inside of arrays and not a single array
            allBoxart.push(...element);
        });
        //We now have one array that simple holds all the art work.
        return allBoxart;
        //We now need to call this function for each route that needs all the boxart
    }
}
//Exports the class so that we can use it in other scripts
module.exports = GamerService;