import "./Main.css";
import { useRef } from "react";

export const Main = ({
  mintNFT,
}: {
  mintNFT: (arg: { tokenID: string }) => Promise<boolean>;
}) => {
  const tokenIDRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="main-mn-container">
        <img className="main-mn" src="/main.png" />
      </div>
      <div className="main-oval filled">Coming Soon!</div>
      {/* <a
        className="main-oval filled"
        onClick={() => {
          return mintNFT({ tokenID: tokenIDRef.current?.value || "" });
        }}
      >
        Mint Your Meta Ninjaz Now
      </a>
      <input
        ref={tokenIDRef}
        className="main-oval"
        placeholder="Quantity (max 50)"
        type="number"
      /> */}
      <div className="minted">
        <div>{0 + "/888 MINTED"}</div>
        <div>0.0888 ETH/each</div>
      </div>
    </>
  );
};
