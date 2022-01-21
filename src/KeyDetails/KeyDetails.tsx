import "./KeyDetails.css";

export const KeyDetails = () => {
  return (
    <>
      <h2 className="key-details">Key Details</h2>
      <div className="key-details-grid">
        <div className="key-details-pair-container">
          <div className="key-details-column">
            <div className="key-details-header">Project Size</div>
            <div className="key-details-value">10,000 NFTs</div>
          </div>
          <div className="key-details-column">
            <div className="key-details-header">Number of Attributes</div>
            <div className="key-details-value">2</div>
          </div>
        </div>
        <div className="key-details-pair-container">
          <div className="key-details-column">
            <div className="key-details-header">Token Mint Price</div>
            <div className="key-details-value">Ξ 0.02</div>
          </div>
          <div className="key-details-column">
            <div className="key-details-header">Tokens Withheld From Sale</div>
            <div className="key-details-value">0</div>
          </div>
        </div>
        <div className="key-details-pair-container">
          <div className="key-details-column">
            <div className="key-details-header">Smart Contract Address</div>
            <div className="key-details-value">0x0a139...</div>
          </div>
          <div className="key-details-column">
            <div className="key-details-header">Token Type</div>
            <div className="key-details-value">ERC-721</div>
          </div>
        </div>
      </div>
    </>
  );
};
