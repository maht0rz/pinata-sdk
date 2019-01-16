include Types;
let apiURL = "https://api.pinata.cloud";

let configure = (~apiKey: string, ~privateApiKey: string, ~apiURL: string = apiURL, ()): pinataConfig => {
    pinataConfig(
        ~apiKey = apiKey, 
        ~privateApiKey = privateApiKey, 
        ~apiURL = apiURL
    );
}
let pinHashToIPFS = PinHashToIPFS.pinHashToIPFS;