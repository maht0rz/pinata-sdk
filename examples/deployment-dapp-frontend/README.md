# deployment-dapp-frontend

This example contains a frontend app scaffolded from reason-react that can be edited under `my-react-app/src`.

### Running the example

`npm run start` will **build *my-react-app***, and the output will be available at `my-react-app/build`. Then it will start a local IPFS node using js-ipfs, which will warm up for a predefined amount of time (e.g. 3 minutes), then it will add the build output to it, and as a last step - it will **pin the resulting IPFS hash** of our `build` directory to Pinata.


To verify that the example works as expected, you can edit `my-react-app/src/Welcome.re` component, and change the string displayed as welcome text. Then `npm run start` again, to start a new deployment.

When the script ends, it will output the hash of your pinned build. You can access it at:
`https://gateway.pinata.cloud/ipfs/<your hash goes here>/`