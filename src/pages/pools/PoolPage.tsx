import React from "react"
import { useParams } from "react-router-dom";
import {useSubscription, useQuery, gql} from "@apollo/client"
import {Components} from "@reef-defi/react-lib"
import { getIconUrl } from "../../utils/utils";
interface PoolPage {
}

interface UrlParam {
  address: string;
}

const MINUTE_CANDLESTICK_GQL = gql`
subscription candlestick($address: String!) {
  pool_minute_candlestick(
    where: { pool: { address: { _ilike: $address } } }
  ) {
    pool_id
    timeframe
    close_1
    close_2
    high_1
    high_2
    low_1
    low_2
    open_1
    open_2
    pool {
      token_1
      token_2
    }
  }
}
`

const POOL_TRANSACTIONS_GQL = gql`
subscription transactions($address: String!, $type: String_comparison_exp!) {
  pool_event(
    where: {
      pool: { address: { _ilike: $address } }
      type: $type
    }
  ) {
    amount_1
    amount_2
    amount_in_1
    amount_in_2
    timestamp
  }
}
`

interface CandlestickData {
  pool_id: number,
  timeframe: string;
  close_1: number;
  close_2: number;
  high_1: number;
  high_2: number;
  open_1: number;
  open_2: number;
  low_1: number;
  low_2: number;
  pool: {
    token_1: string;
    token_2: string;
  }
}

const PoolPage = ({} : PoolPage): JSX.Element => {
  const {address} = useParams<UrlParam>();
  const token1Icon = getIconUrl(address);
  const {loading: candlestickLoading, data: candlestickData, error: candlestickError} = useSubscription<CandlestickData[]>(
    MINUTE_CANDLESTICK_GQL, 
    { variables: { address } }
  );
  const {loading, data, error} = useQuery(
    gql`
      query pool($address: String!) {
        pool (
          where: { address: { _ilike: $address } }
        ) {
          token_1_address
        }
      }
    `
  )

  // useEffect(async () => {


  // }, [address])

  return (
    <div className="w-100 row justify-content-center">
      <div className="col-xl-8 col-lg-10 col-md-12">
          <Components.Card.CardHeader>
            <div className="d-flex">
              <Components.Icons.TokenIcon src=""/>
              <Components.Icons.TokenIcon src=""/>

              <Components.Text.LeadText>
                Token1 / Token2
              </Components.Text.LeadText>
            </div>
          </Components.Card.CardHeader>

        <Components.Display.FullRow>
          <Components.Display.ContentBetween>
            <div className="d-flex my-2">
              <div className="card border-rad">
                <div className="card-body py-1">
                  <div className="d-flex">
                    <Components.Icons.TokenIcon src=""/>
                    <Components.Display.ME size="1" />
                    <Components.Text.LeadText>
                      1 Token1 = n Token2
                    </Components.Text.LeadText>
                  </div>
                </div>
              </div>
              <Components.Display.ME size="1" />

              <div className="card border-rad">
                <div className="card-body py-1">
                  <div className="d-flex">
                    <Components.Icons.TokenIcon src=""/>
                    <Components.Display.ME size="1" />
                    <Components.Text.LeadText>
                      1 Token1 = n Token2
                    </Components.Text.LeadText>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              {/* <button className="btn">Add liquidity</button> */}
              <Components.Button.Button >AddLiqudity</Components.Button.Button>
              <Components.Display.ME size="1" />
              <Components.Button.Button>Trade</Components.Button.Button>
            </div>
          </Components.Display.ContentBetween>
        </Components.Display.FullRow>

        <div className="row mt-2">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="border-rad bg-grey p-3">
              <Components.Card.Card>
                <div className="d-flex mb-2">
                  <Components.Card.CardTitle title="Total Tokens Locked" />
                </div>
                <Components.Display.FullRow>
                  <Components.Display.ContentBetween>
                    <div className="d-flex">
                      <Components.Icons.TokenIcon src=""/>
                      <Components.Display.ME size="1" />
                      <Components.Text.LeadText>
                        Token1
                      </Components.Text.LeadText>
                    </div>
                    <div className="">
                      <Components.Text.LeadText>
                        155.79m
                      </Components.Text.LeadText>
                    </div>
                  </Components.Display.ContentBetween>
                </Components.Display.FullRow>
                
                <Components.Display.MT size="1" />
                <Components.Display.FullRow>
                  <Components.Display.ContentBetween>
                    <div className="d-flex">
                      <Components.Icons.TokenIcon src=""/>
                      <Components.Display.ME size="1" />
                      <Components.Text.LeadText>
                        Token2
                      </Components.Text.LeadText>
                    </div>
                    <div className="">
                      <Components.Text.LeadText>
                        1123.79m
                      </Components.Text.LeadText>
                    </div>
                  </Components.Display.ContentBetween>
                </Components.Display.FullRow>
              </Components.Card.Card>
            
              <Components.Display.MT size="2" />

              <div className="d-flex flex-column mt-3 ms-1">
                <Components.Text.LeadText>TVL</Components.Text.LeadText>
                <Components.Text.BoldText>$371.41m</Components.Text.BoldText>
                <Components.Text.ColorText color="success">2.14 %</Components.Text.ColorText>
              </div>

              <div className="d-flex flex-column mt-3 ms-1">
                <Components.Text.LeadText>Colume 24h</Components.Text.LeadText>
                <Components.Text.BoldText>$71.41m</Components.Text.BoldText>
                <Components.Text.ColorText color="danger">38.2 %</Components.Text.ColorText>
              </div>
              <div className="d-flex flex-column mt-3 ms-1">
                <Components.Text.LeadText>24h Fees</Components.Text.LeadText>
                <Components.Text.BoldText>$100k</Components.Text.BoldText>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-8">
            <div className="border-rad bg-grey p-1 h-100">
              Chart
            </div>
          </div>
        </div>
        <Components.Display.MT size="3" />

        <Components.Card.CardHeader>
          <Components.Card.CardTitle title="Transactions" />
        </Components.Card.CardHeader>

        <Components.Card.Card>

          <div>
            Transactions
          </div>
        </Components.Card.Card>
      </div>
    </div>
  );
}

// These needs to be removed
export default PoolPage;