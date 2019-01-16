// Fetch polyfill is necessary for node.js
fetch = require('node-fetch');
var Pinata = require('pinata-sdk');

// api key pair for Pinata
var apiKey = "<your api key>";
var privateApiKey = "<your private api key>";

// ipfs hash of our content
var hash = "<your ipfs content hash>";

// configure pinata
var pinata = Pinata.configure(apiKey, privateApiKey);

// pin our content hash to ipfs using previously created config
Pinata.pinHashToIPFS(
    pinata,
    hash
)
    // result is the response from pinata api
    .then((result) => {
        console.log("Content pinned successfully", result.ipfsHash);
    })
    .catch((result) => {
        console.error("Content was not pinned");
    })