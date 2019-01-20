// Fetch polyfill is necessary for node.js
fetch = require('node-fetch');
const Pinata = require('pinata-sdk');
const apiCredentials = require('./credentials');

// ipfs hash of our content
const hash = "<your ipfs content hash>";
// configure pinata
const pinata = Pinata.configure(
    apiCredentials.apiKey, 
    apiCredentials.privateApiKey
);

(async () => {
    // pin our content hash to ipfs using previously created config
    try {
        const result = await Pinata.pinHashToIPFS(
            pinata,
            hash
        );
        
        // result is the response from pinata api
        console.log("Content pinned successfully", result.ipfsHash);
    } catch (err) {
        console.error("Content was not pinned", err);
    }
})();