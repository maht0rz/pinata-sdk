open PinataSdk;
open PinataSdk.PinHashToIPFS;

[@bs.module "./../credentials.js"] external apiKey : string = "apiKey";
[@bs.module "./../credentials.js"] external privateApiKey : string = "privateApiKey";

[%bs.raw {| 
    global.fetch = require('node-fetch')
|}];
let hash = "<your ipfs hash goes here>";
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