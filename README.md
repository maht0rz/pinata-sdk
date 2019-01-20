# Pinata SDK 

Unofficial SDK for [Pinata](https://pinata.cloud), implemented in ReasonML and compiled to Javascript.

### What is Pinata?
Pinning service that improves your IPFS experience by deploying the underlying infrastructure so you don't have to!

In order to use some of the SDK's features, you'll have to [sign up](https://pinata.cloud/signup) with Pinata to obtain your API keys. To learn more about Pinata check out the [getting started guide](https://pinata.cloud/documentation#GettingStarted).

## Installing

Install the package - it includes both the javascript & reason versions.
```
npm i --save pinata-sdk
```

If you're using ReasonML, add this to your `bsconfig.json`:
```javascript
"bs-dependencies": [
    "pinata-sdk"  
],
```

## Quick start 👩‍💻
Following examples demonstrates pinning an IPFS hash on Pinata, using the SDK. In order to do so, you need to authenticate yourself with [Pinata API keys](https://pinata.cloud/documentation#GettingStarted).

> ⚠️ For usage with Node.js, make sure to include the `node-fetch` polyfill. 

### ReasonML

```ocaml
open PinataSdk;
open PinataSdk.PinHashToIPFS;

let hash = "<your ipfs content hash>";
let apiKey = "<your api key>";
let privateApiKey = "<your private api key>";
let pinata = Pinata.configure(
  ~apiKey = apiKey,
  ~privateApiKey = privateApiKey,
  ()
);

pinata
  ->Pinata.pinHashToIPFS(~hash=hash)
    |> then_(result => {
      Js.log("Content pinned successfully" ++ result->ipfsHashGet)
      Js.Promise.resolve(result);
    })
```

### TypeScript

```typescript
import * as Pinata from 'pinata-sdk';
const apiKey = "<your api key>";
const privateApiKey = "<your private api key>";
const hash = "<your ipfs content hash>";
const pinata: Pinata.PinataConfig = Pinata.configure(apiKey, privateApiKey);

(async function() {
    try {
        const result: Pinata.PinHashToIPFSResponseJS = await Pinata.pinHashToIPFS(
            pinata,
            hash
        );
        console.log("Content pinned successfully", result.ipfsHash);
    } catch (err) {
        console.error("Content was not pinned", err);
    }
})();
```

### Javascript

```javascript
const Pinata = require('pinata-sdk');
const apiKey = "<your api key>";
const privateApiKey = "<your private api key>";
const hash = "<your ipfs content hash>";
const pinata = Pinata.configure(apiKey, privateApiKey);

(async function() {
    try {
        const result = await Pinata.pinHashToIPFS(
            pinata,
            hash
        );
        console.log("Content pinned successfully", result.ipfsHash);
    } catch (err) {
        console.error("Content was not pinned", err);
    }
})();
```

## API 🕹

Available methods of the SDK, for usage examples see the [quick start guide](https://github.com/maht0rz/pinata-sdk#quick-start-) or the [examples](https://github.com/maht0rz/pinata-sdk#examples-) section.

##### configure (~apiKey: string, ~privateApiKey: string, ~apiURL: string = apiURL): pinataConfig

- `apiKey` your api key from pinata
- `privateApiKey` your private api key from pinata
- `apiURL` optional, default value `https://api.pinata.cloud`

##### pinHashToIPFS (config: pinataConfig, ~hash: ipfsHash): Promise.t(pinHashToIPFSResponseJS)

- `config` SDK configuration created via `configure()`
- `hash` IPFS content hash to be pinned

## Examples 🤓

You can find the usage examples in the [`examples`](https://github.com/maht0rz/pinata-sdk/tree/master/examples) folder.

> 🐳 Optionally you can start the development container described in the [contributing](https://github.com/maht0rz/pinata-sdk#contributing-) section, in order to run the examples smoothly.

Make sure to:
1. `npm i` before running each example.
2. Update your Pinata API credentials in `examples/**/credentials.js`
3. Update the IPFS hash you want to pin - usually a string in the example's source files.

Each example can be run using `npm start`. 

Some examples might contain additional `README.md` to help you understand the details.

## Contributing 🔧

PinataSDK is developed & built trough docker, to start contributing, you'll have to [setup docker](https://www.docker.com) for your platform first. 
> Editor support for ReasonML works well with VSCode's [OCaml and Reason IDE](https://marketplace.visualstudio.com/items?itemName=freebroccolo.reasonml)

### Development container

Everything you need to contribute to PinataSDK happens inside the development container

```bash
# Build an image for our dev container
make build-image
# Launch the container with an interactive bash session
make bash
```

### Available commands

List of available commands can be found in `package.json`.

```bash
# Install dependencies
npm install

# Rebuild on every file change
npm run start

# Build the SDK
npm run build

# Cleans build artifacts
npm run clean
```

## License 📃

PinataSDK is available under the MIT License

## Powered by

<div float="left">
  <img src="https://cdn-images-1.medium.com/max/1200/1*BTGStLRXsQUbkp0t-oxJhQ.png" width="100" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/220px-Ipfs-logo-1024-ice-text.png" width="100" />
  <img src="https://cdn-images-1.medium.com/max/1050/1*rFOtAIWjbeAyNNFcW029bQ.png" width="100" /> 
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="100" /> 
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="100" /> 
  
</div>
<br/>

## Credits 😎

Pinata SDK is created and maintained by [Matej Sima](https://t.me/maht0rz).

Special thanks to the Pinata team for such an awesome service!



