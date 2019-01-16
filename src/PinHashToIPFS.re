include Types;
open Json;
open Js;

let decodeResponse = (response) => {
    Promise.resolve(Decode.{
        ipfsHash: response |> field("IpfsHash", string)
    })
}

let pinHashToIPFS = 
    (config: pinataConfig, ~hash: ipfsHash)
        : Promise.t(pinHashToIPFSResponseJS) => {

                let url: string = config->apiURLGet ++ "/pinning/pinHashToIPFS";

                let payload = Dict.empty();
                Dict.set(payload, "hashToPin", Json.string(hash));

                Fetch.fetchWithInit(
                    url,
                    Fetch.RequestInit.make(
                        ~method_=Post,
                        ~body=Fetch.BodyInit.make(Json.stringify(Json.object_(payload))),
                        ~headers=Fetch.HeadersInit.make({
                            "Content-Type": "application/json",
                            "pinata_api_key": config->apiKeyGet,
                            "pinata_secret_api_key": config->privateApiKeyGet
                        }),
                        ()
                    )
                )
                |> Promise.then_(Fetch.Response.json)
                |> Promise.then_(decodeResponse)
                |> Promise.then_(response => {
                    Promise.resolve(pinHashToIPFSResponseJS(~ipfsHash = response.ipfsHash));
                })
            };