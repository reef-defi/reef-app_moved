import React, { useState } from "react"
import TokenCandlestickChart from "./TokenCandlestickChart";

interface ChartSelector {
  address: string;
}

type ChartSwitch = "Token 1" | "Token 2" | "Volume" | "TVL" | "Fee";

const ChartSelector = ({address} : ChartSelector): JSX.Element => {
  const [chart, setChart] = useState<ChartSwitch>('Token 1');

  return (
    <>
      <div className="d-flex justify-content-end mt-1 me-1">
        <div className="btn-group">
          <button className={`btn btn${chart === 'Token 1' ? "" : "-outline"}-secondary`} onClick={() => setChart('Token 1')}>Token 1</button>
          <button className={`btn btn${chart === 'Token 2' ? "" : "-outline"}-secondary`} onClick={() => setChart('Token 2')}>Token 2</button>
          <button className={`btn btn${chart === 'TVL' ? "" : "-outline"}-secondary`} onClick={() => setChart('TVL')}>TVL</button>
          <button className={`btn btn${chart === 'Volume' ? "" : "-outline"}-secondary`} onClick={() => setChart('Volume')}>Volume</button>
          <button className={`btn btn${chart === 'Fee' ? "" : "-outline"}-secondary`} onClick={() => setChart('Fee')}>Fee</button>
        </div>
      </div>
      <div className="d-flex h-100">
        { chart === 'Token 1' && <TokenCandlestickChart address={address} whichToken={2} /> } 
        { chart === 'Token 2' && <TokenCandlestickChart address={address} whichToken={1} /> } 
        { chart === 'TVL' && <TokenCandlestickChart address={address} whichToken={1} /> } 
        { chart === 'Volume' && <TokenCandlestickChart address={address} whichToken={1} /> } 
        { chart === 'Fee' && <TokenCandlestickChart address={address} whichToken={1} /> } 
      </div>
    </>
  );
}

export default ChartSelector;