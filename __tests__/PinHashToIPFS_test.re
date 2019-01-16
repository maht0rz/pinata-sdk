open Jest;
open Expect;
open PinHashToIPFS;
open Js.Promise;

describe("pinHashToIPFS", () => {

  beforeEach(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("should resolve with pinned hash when successfull", () => {
    
    JestFetchMock.mockResponse(
      ~body={js|{"IpfsHash": "exampleHash"}|js},
      ~status=200,
      ~statusText="200",
      (),
    );

    let hash = "exampleHash";
    let apiKey = "apiKey";
    let privateApiKey = "privateApiKey";

    let pinata = Pinata.configure(
      ~apiKey = apiKey,
      ~privateApiKey = privateApiKey,
      ()
    );

    pinata
      ->Pinata.pinHashToIPFS(~hash=hash)
        |> then_(result => {
          expect(result->ipfsHashGet) |> toBe("exampleHash") |> resolve
        });
  });

});