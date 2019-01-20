import './fetch';
import * as Pinata from 'pinata-sdk';
import * as IPFS from 'ipfs';
import * as apiCredentials from './credentials';

// build output paths
const buildFolderName = 'build';
const buildFolderPath = './' + buildFolderName;
// how long to wait, before adding files to IPFS and pinning them to Pinata
const minutesForNodeWarmUp = 3;
const pinata: Pinata.PinataConfig = Pinata.configure(apiCredentials.apiKey, apiCredentials.privateApiKey);

const node = new IPFS({
    config: {
        Addresses: {
            Swarm: [
                // expose the same tcp port as go-ipfs, it appears to perform better with those settings
                '/ip4/0.0.0.0/tcp/4001',
            ],
        },
    }
});

console.log('Waiting for IPFS node to be ready');

node
    // Wait for the IPFS node to warm up
    .on('ready', () => {
        console.log(`Waiting for node to warm up, it will take ${minutesForNodeWarmUp} minute(s)`);
        
        setTimeout(() => {
            console.log('Node warmed up, adding & pinning build files');
            // Add the target build folder to IPFS
            node.addFromFs(buildFolderPath, { recursive: true }, async (err, result) => {
                if (err) { throw err }
                const buildFolderObject = 
                    result
                        .filter((ipfsObject) => {
                            return ipfsObject.path === buildFolderName
                        })[0];
            
                const response: Pinata.PinHashToIPFSResponseJS = await Pinata.pinHashToIPFS(
                    pinata,
                    buildFolderObject.hash
                )
                // your content is now pinned on Pinata, our local IPFS node will shut down
                // but your content will still be accessible on the IPFS network
                node.stop(() => console.log("Deployment successfull!", response.ipfsHash))
            });
        }, 1000 * 60 * minutesForNodeWarmUp)
    });