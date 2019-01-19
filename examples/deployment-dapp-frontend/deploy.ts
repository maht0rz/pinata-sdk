import './fetch';
import * as Pinata from 'pinata-sdk';
import * as IPFS from 'ipfs';

// api key pair for Pinata
// const apiKey = "<your api key>";
// const privateApiKey = "<your private api key>";
const apiKey = "<your api key>";
const privateApiKey = "<your private api key>";
// build output paths
const buildFolderName = 'build';
const buildFolderPath = './' + buildFolderName;
// how long to wait, before adding files to IPFS and pinning them to Pinata
const minutesForNodeWarmUp = 3;
const pinata: Pinata.PinataConfig = Pinata.configure(apiKey, privateApiKey);

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
            node.addFromFs(buildFolderPath, { recursive: true }, (err, result) => {
                if (err) { throw err }
                const buildFolderObject = 
                    result
                        .filter((ipfsObject) => {
                            return ipfsObject.path === buildFolderName
                        })[0];
            
                Pinata.pinHashToIPFS(
                    pinata,
                    buildFolderObject.hash
                )
                    .then((result: Pinata.PinHashToIPFSResponseJS) => {
                        // your content is now pinned on Pinata, our local IPFS node will shut down
                        // but your content will still be accessible on the IPFS network
                        node.stop(() => console.log("Deployment successfull!", result.ipfsHash))
                    })
                    .catch((err) => {
                        // something went wrong in the pinning process, perhaps the IPFS look up timed out
                        node.stop(() => console.error("Deployment failed!", buildFolderObject.hash, err));
                    });
            });
        }, 1000 * 60 * minutesForNodeWarmUp)
    });