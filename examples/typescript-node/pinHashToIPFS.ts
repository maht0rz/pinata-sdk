// Fetch polyfill is necessary for node.js
import './fetch';
import * as Pinata from 'pinata-sdk';
import * as apiCredentials from './credentials';

// ipfs hash of our content
const hash = "<your ipfs content hash>";
// configure pinata
const pinata: Pinata.PinataConfig = Pinata.configure(
    apiCredentials.apiKey, 
    apiCredentials.privateApiKey
);

(async function() {
    try {
        // pin our content hash to ipfs using previously created config
        const result: Pinata.PinHashToIPFSResponseJS = await Pinata.pinHashToIPFS(
            pinata,
            hash
        );
        // result is the response from pinata api
        console.log("Content pinned successfully", result.ipfsHash);
    } catch (err) {
        console.error("Content was not pinned", err);
    }
})();