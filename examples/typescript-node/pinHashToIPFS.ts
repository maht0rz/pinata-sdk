// Fetch polyfill is necessary for node.js
import './fetch';
import * as Pinata from 'pinata-sdk';

// api key pair for Pinata
const apiKey = "<your api key>";
const privateApiKey = "<your private api key>";

// ipfs hash of our content
const hash = "<your ipfs content hash>";

const pinata: Pinata.PinataConfig = Pinata.configure(apiKey, privateApiKey);

Pinata.pinHashToIPFS(
    pinata,
    hash
)
    .then((result: Pinata.PinHashToIPFSResponseJS) => {
        console.log("Content pinned successfully", result.ipfsHash);
    })
    .catch(() => {
        console.error("Content was not pinned");
    });