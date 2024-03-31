/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generate(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.generate());
  }

function makeText(path) {
    fs.readFile(path, "utf8", function x(err, data){
        if (err) {
            console.error(`Error reading file: ${path} : ${err}`);
            process.exit(1)
        }
        else {
            generate(data);
        }
    })
}

async function makeURLText(url){
    let res;
    try{
        res = await axios.get(url);
    }
    catch (err){
        console.error(`Error retrieving url: ${url} : ${error}`);
        process.exit(1);
    }
    generate(res.data)
}

let [method, path] = process.argv.slice(2);

if (method === 'file'){
    makeText(path);
}
else if (method === 'url'){
    makeURLText(path);
}
else {
    console.error(`Invalid method: ${method}`)
    process.exit(1);
}