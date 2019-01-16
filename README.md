# Pinata SDK 

Unofficial SDK for [Pinata](https://pinata.cloud), implemented in ReasonML and compiled to Javascript

<div float="left">
  <img src="https://cdn-images-1.medium.com/max/1200/1*BTGStLRXsQUbkp0t-oxJhQ.png" width="100" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/220px-Ipfs-logo-1024-ice-text.png" width="100" />
  <img src="https://cdn-images-1.medium.com/max/1050/1*rFOtAIWjbeAyNNFcW029bQ.png" width="100" /> 
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="100" /> 
  
</div>
<br/>

## Installing

Install the package - it includes both the javascript & reason versions.
```
npm i --save pinata-sdk
```

Add this to your `bsconfig.json`:
```javascript
  "bs-dependencies": [
    "pinata-sdk"  
  ],
```

## Usage 👩‍💻

> ⚠️ For usage with Node.js, make sure to include the `node-fetch` polyfill. 

### Javascript

```javascript
var Pinata = require('pinata-sdk');

var apiKey = "<your api key>";
var privateApiKey = "<your private api>";

var hash = "<your ipfs content hash>";

var pinata = Pinata.configure(apiKey, privateApiKey);

Pinata.pinHashToIPFS(
    pinata,
    hash
)
    .then((result) => {
        console.log("Content pinned successfully", result.ipfsHash);
    })
```

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

## API 🕹

##### configure (~apiKey: string, ~privateApiKey: string, ~apiURL: string = apiURL): pinataConfig

- `apiKey` your api key from pinata
- `privateApiKey` your private api key from pinata
- `apiURL` optional, default value `https://api.pinata.cloud`

##### pinHashToIPFS (config: pinataConfig, ~hash: ipfsHash): Promise.t(pinHashToIPFSResponseJS)

- `config` SDK configuration created via `configure()`
- `hash` IPFS content hash to be pinned

## Examples 🤓

You can find the usage examples in the `examples` folder.

Make sure to:
1. `npm i` before running each example.
2. Update your Pinata API credentials in the example code.

Each example can be run using `npm start`. E.g.: `cd examples/node && npm start`

## Contributing 🔧

PinataSDK is developed & built trough docker, to start contributing, you'll have to [setup docker](https://www.docker.com) for your platform first first. 
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

## Credits 😎

Pinata SDK is created and maintained by [Matej Sima](https://t.me/maht0rz).

Special thanks to the Pinata team for such an awesome service!



