/* This is the basic component. */
let component = ReasonReact.statelessComponent("Welcome");
let make = (_children) => {
  ...component,
  render: _ =>
    <div>
      {ReasonReact.string("ReasonReact app #8 Deployed to IPFS using PinataSDK!")}
    </div>,
};
