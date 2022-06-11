const fs = require('fs');
const process = require('process');
const axios = require('axios');
const urlExists = require('url-exists');
const { isUri } = require('valid-url');


function isURL(path) {
    urlExists(path, function(err, exists) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)

        } else {
            if(exists) {
                catURL(path)
    
            } else {
                catFile(path)
            }
        }
    })
}

async function catURL(path) {
    try {
        let resp = await axios.get(path);
        printOrWrite(resp.data, out)
    
    } catch(err) {
        console.log(`Error fetching ${path}: ${err}`)
        process.exit(1)
    }
}

function catFile(path) {
    try {
        let content = fs.readFileSync(path, 'utf-8') 
        printOrWrite(content, out)
    }
    catch (err) {
        console.log(`Error reading ${path}: ${err}`)
        process.exit(1)
    }
}

function printOrWrite(content, out) {
    if(out) {
        try {
            fs.writeFileSync(out, content, 'utf-8')
            console.log("File written!")

        } catch(err) {
            console.log(`Could not write to ${out}: ${err}`)
            process.exit(1)
        }
    } else {
        console.log(content)
    }
}

let path
let out


if(process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

isURL(path)