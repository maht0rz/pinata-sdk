open PinataSdk;
open PinataSdk.PinHashToIPFS;

[%bs.raw {| 
    global.fetch = require('node-fetch')
|}];
let hash = "<your ipfs content hash>";
let apiKey = "<your api key>";
let privateApiKey = "<your private api key>";
let pinata = Pinata.configure(
  ~apiKey = apiKey,
  ~privateApiKey = privateApiKey,
  ()
);

pinata
  -> Pinata.pinHashToIPFS(~hash = hash)
    |> Js.Promise.then_(result => {
      Js.log(result->ipfsHashGet)
      Js.Promise.resolve(result);
    })