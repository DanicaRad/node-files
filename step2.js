const fs = require('fs');
const process = require('process');
const axios = require('axios');
const URLexists = require('url-exists');

function cat(path) {
    URLexists(path, function(err, exists) {
        if(err) {
            console.log(`Error ${err}`)
            process.exit(1)

        } else if(exists) {
            readURL(path)

        } else {
            readFile(path)
        }
    })
}

async function readURL(path) {
    try {
        let resp = await axios.get(path);
        console.log(resp.data)
    
    } catch(err) {
        console.log(`Error fetching ${path}:`)
        console.error(err)
        process.exit(1)
    }
}

async function readFile(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`)
            console.error(`${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])