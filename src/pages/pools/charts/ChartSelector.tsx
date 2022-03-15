import React, { useState } from "react"
import FeeChart from "./FeeChart";
import TokenCandlestickChart from "./TokenCandlestickChart";
import TVLChart from "./TVLChart";
import { BasicPoolInfo } from "./types";
import VolumeChart from "./VolumeChart";

type ChartSwitch = "Token 1" | "Token 2" | "Volume" | "TVL" | "Fee";

const ChartSelector = (pool : BasicPoolInfo): JSX.Element => {
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
        { chart === 'Token 1' && <TokenCandlestickChart address={pool.address} whichToken={1} /> } 
        { chart === 'Token 2' && <TokenCandlestickChart address={pool.address} whichToken={2} /> } 
        { chart === 'TVL' && <TVLChart address={pool.address} /> } 
        { chart === 'Volume' && <VolumeChart {...pool} /> } 
        { chart === 'Fee' && <FeeChart {...pool} /> } 
      </div>
    </>
  );
}

export default ChartSelector;