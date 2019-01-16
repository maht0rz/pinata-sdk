type ipfsHash = string;
type ipfsMetadata = Js.Dict.t(string);

[@bs.deriving abstract]
type pinataConfig = {
  apiKey: string,
  privateApiKey: string,
  apiURL: string
};

type pinHashToIPFSResponse = {
  ipfsHash: string
};

[@bs.deriving abstract]
type pinHashToIPFSResponseJS = {
  ipfsHash: string
};