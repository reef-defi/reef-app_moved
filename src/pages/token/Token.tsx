import { Provider } from "@reef-defi/evm-provider";
import {
  appState,
  createEmptyTokenWithAmount,
  ensureExistentialTokenAmount,
  ensureTokenAmount,
  hooks,
  ReefSigner,
  REEF_TOKEN,
  TokenWithAmount,
  utils,
  Components,
} from "@reef-defi/react-lib";
import Uik from "@reef-defi/ui-kit";
import BigNumber from "bignumber.js";
import { Contract } from "ethers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PoolContext from "../../context/PoolContext";
import TokenContext from "../../context/TokenContext";
import TokenPricesContext from "../../context/TokenPricesContext";
import { notify } from "../../utils/utils";
import { ERC20 } from "./../../assets/abis/ERC20";
import SendConfirmationModal from "./SendConfirmationModal";
import "./Token.css";
import "./../pools/Pool/stats.css";

import { LastPoolReserves } from '@reef-defi/react-lib';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL } from "../../urls";

const {Display, Card, Input, Modal, Icons, Button, TokenAmountFieldMax, Loading, AccountListModal} = Components;
const { ensure } = utils;

interface Address {
  address: string;
}

interface InfoItem {
  name: string;
  value: string;
}

const InfoItem = ({ name, value }: InfoItem): JSX.Element => (
  <div className="token__show-item">
    <h3>{name}</h3>
    <h5>{value}</h5>
  </div>
);


interface PoolItem {
  data: LastPoolReserves;
}

// Using ! for token_data is not the nice way to do thins 
// Here is used only because we filtered out not verified pools!
const PoolItem = ({data: {address, token_1, token_2, token_data_1, token_data_2}}: PoolItem): JSX.Element => {
  const history = useHistory();
  const toPool = () => history.push(
    POOL_CHART_URL
      .replace(':address', address)
      .replace(':action', 'trade')
    );

  return (
    <Uik.Card
    className="d-flex flex-column"
    >
      <Uik.Container>
        <button
          className="pool-stats__pool-select"
          type="button"
        >
          <div className="pool-stats__pool-select-pair">
            <img
              src={utils.getIconUrl(token_1)}
              alt={token_data_1!.symbol}
              className={`pool-stats__pool-select-pair--${Uik.utils.slug(token_data_1!.symbol)}`}
            />
            <img
              src={utils.getIconUrl(token_2)}
              alt={token_data_2!.symbol}
              className={`pool-stats__pool-select-pair--${Uik.utils.slug(token_data_2!.symbol)}`}
            />
          </div>
          <span className="pool-stats__pool-select-name">
            { token_data_1!.symbol }
            {' '}
            /
            {' '}
            { token_data_2!.symbol }
          </span>
        </button>


        <div>
          Additional info can be added
          ...
        </div>

        <Uik.Button
          text="Trade"
          onClick={toPool}
        />
      </Uik.Container>
    </Uik.Card>
  );
}

const getSignerEvmAddress = async (
  address: string,
  provider: Provider
): Promise<string> => {
  if (address.length !== 48 || address[0] !== "5") {
    return address;
  }
  const evmAddress = await provider.api.query.evmAccounts.evmAddresses(address);
  const addr = (evmAddress as any).toString();

  if (!addr) {
    throw new Error("EVM address does not exist");
  }
  return addr;
};

const sendStatus = (
  to: string,
  token?: TokenWithAmount,
  signer?: ReefSigner
): utils.ButtonStatus => {
  try {
    const toAddress = to.trim();
    ensure(!!token, "Token not found");
    ensure(!!signer, "Signer is not initialized");
    ensure(toAddress.length !== 0, "Missing destination address");
    ensure(
      toAddress.length === 42 ||
        (toAddress.length === 48 && toAddress[0] === "5"),
      "Incorrect destination address"
    );
    if (toAddress.startsWith("0x")) {
      ensure(signer!.isEvmClaimed, "Bind account");
    }
    ensure(token!.amount !== "", "Insert amount");
    ensureTokenAmount(token!);
    ensureExistentialTokenAmount(token!);

    return { isValid: true, text: "Confirm Send" };
  } catch (e: any) {
    return { isValid: false, text: e.message };
  }
};

const Token = (): JSX.Element => {
  const history = useHistory();
  const { address } = useParams<Address>();
  const { tokens, loading } = useContext(TokenContext);
  const allPools = useContext(PoolContext);
  const tokenPrices = useContext(TokenPricesContext);

  const accounts = hooks.useObservableState(appState.signers$);
  const selectedSigner = hooks.useObservableState(appState.selectedSigner$);

  // Send state
  const [to, setTo] = useState("");
  const [token, setToken] = useState(createEmptyTokenWithAmount());
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onAmountChange = (amount: string): void => setToken({...token, amount});


  // Finding token from token context and creating a copy of if with current amount
  // This keeps balances in place
  useEffect(
    () => {
      const found = tokens.find((t) => t.address === address);
      if (found) {
        setToken({...token, ...found, amount: token.amount, isEmpty: false});
      }
    }, 
    [address, tokens]
  )
  // Retrieving token price
  const price = useMemo(
    () => (address in tokenPrices ? tokenPrices[address] : 0),
    [tokenPrices, address]
  );
  // Filtering pools in which token exists and converting them to components
  const pools = useMemo(
    () =>
      allPools
        .filter(({ token_1, token_2 }) => token_1 === address || token_2 === address)
        .filter(({token_data_1, token_data_2}) => token_data_1 !== undefined && token_data_2 !== undefined)
        .map((pool) => <PoolItem data={pool} key={pool.address} />),
    [allPools, address]
  );

  // Calculating user balance
  const userBalance = useMemo(
    () =>
      new BigNumber(token?.balance.toString() || 0)
        .div(new BigNumber(10).pow(token?.decimals || 1))
        .multipliedBy(price)
        .toFixed(2),
    [price, token]
  );

  const { text, isValid } = sendStatus(
    to,
    token,
    selectedSigner === null ? undefined : selectedSigner
  );

  const toInitialPoolSupply = () => {
    history.push(
      ADD_LIQUIDITY_URL
        .replace(':address1', address)
        .replace(':address2', '0x')
    )
  }

  const onSend = async (): Promise<void> => {
    if (!token || !selectedSigner) {
      return;
    }
    try {
      const { signer } = selectedSigner;
      const tokenContract = new Contract(token.address, ERC20, signer);
      setLoading(true);
      ensureTokenAmount(token);
      ensureExistentialTokenAmount(token);
      const amount = utils.calculateAmount(token);

      if (token.address === REEF_TOKEN.address && to.length === 48) {
        setStatus("Transfering native REEF");
        await utils.nativeTransfer(amount, to, signer.provider, selectedSigner);
      } else {
        setStatus("Extracting evm address");
        const toAddress =
          to.length === 48
            ? await getSignerEvmAddress(to, signer.provider)
            : to;
        setStatus(`Transfering ${token.symbol}`);
        await tokenContract.transfer(toAddress, amount);
      }

      notify("Balances will reload after blocks are finalized.", "info");
      notify("Tokens sent successfully!");
    } catch (e: any) {
      console.error(e);
      notify(`There was an error while sending tokens: ${e.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Show some message that tokens are loading
  if (loading && tokens.length === 0) {
    return <div>Loading tokens...</div>;
  }
  if (!token || !selectedSigner) {
    // TODO Show some error page with text
    return <div>Token does not exist</div>;
  }

  return (
    <Uik.Container vertical>
      <Uik.Container>
        {/* Token Info */}
        <Uik.Card className="token__info">
          <img
            src={token.iconUrl}
            alt={token.symbol}
            className={`
                pool-stats__token-image
                pool-stats__token-image--${Uik.utils.slug(token.symbol)}
              `}
          />
          <InfoItem name="Price" value={price.toFixed(4)} />
          <InfoItem name="Name" value={token.name} />
          <InfoItem name="Symbol" value={token.symbol} />
          <InfoItem name="Decimals" value={token.decimals.toString()} />
          <InfoItem name="Address" value={token.address} />
          <InfoItem name="Your balance" value={userBalance} />
        </Uik.Card>

        <Uik.Container vertical>
          <Uik.Button 
            text="Add initial supply"
            onClick={toInitialPoolSupply}
          />
          {/* Send */}
          <Uik.Card className="token__item">
            <Uik.Text>Send {token.symbol}</Uik.Text>
            <Display.MT size="2" />
            <Card.SubCard>
              <Display.MT size="1" />
              <div className="input-group">
                <Input.Input
                  value={to}
                  maxLength={70}
                  onChange={(toVal: string) =>
                    setTo(utils.removeReefSpecificStringFromAddress(toVal))
                  }
                  placeholder="Send to address"
                  disabled={isLoading}
                />
                <div className="input-group-append">
                  <span className="input-group-text p-0 h-100" id="basic-addon2">
                    <Modal.OpenModalButton
                      id="selectMyAddress"
                      disabled={isLoading}
                      // TODO add custom css class for border radious insted of rounded
                      className="btn btn-reef btn-outline-secondary rounded px-3 h-100"
                    >
                      <Icons.DownIcon small />
                    </Modal.OpenModalButton>
                  </span>
                </div>
              </div>
              <Display.MT size="2" />
            </Card.SubCard>
            <Button.SwitchTokenButton disabled addIcon />
            <TokenAmountFieldMax
              onTokenSelect={() => {}}
              onAmountChange={onAmountChange}
              signer={selectedSigner}
              token={token}
              tokens={tokens}
            />

            <Display.MT size="2">
              <Display.CenterColumn>
                <Modal.OpenModalButton
                  id="send-confirmation-modal-toggle"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? <Loading.LoadingButtonIconWithText text={status} /> : text}
                </Modal.OpenModalButton>
              </Display.CenterColumn>
            </Display.MT>

            <SendConfirmationModal
              to={to}
              token={token}
              confirmFun={onSend}
              id="send-confirmation-modal-toggle"
            />
            <AccountListModal
              id="selectMyAddress"
              accounts={accounts || []}
              selectAccount={(_, signer) => setTo(signer.address)}
              title="Select Account"
            />
          </Uik.Card>
        </Uik.Container>

      </Uik.Container>
      <Uik.Container
        vertical
      >
        <Uik.Text type="headline">Pools</Uik.Text>          
        {pools}
      </Uik.Container>
    </Uik.Container>
  );
};

export default Token;
