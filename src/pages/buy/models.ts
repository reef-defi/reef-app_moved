export interface BuyPair {
  'fiatCurrency': string,
  'cryptoCurrency': string,
  'paymentMethod': 'card',
  /* incremental order amount each time */
  'size': number,
  /* Crypto price */
  'quotation': number,
  /* min order amount */
  'minLimit': number,
  /* max order amount */
  'maxLimit': number
}

export class BuyPayload {
  address: string;

  fiatCurrency: string;

  cryptoCurrency: string;

  orderAmount: number;

  merchantRedirectUrl: string;

  constructor(address: string, fiatCurrency: string, cryptoCurrency: string, orderAmount: number, redirectUrl: string) {
    this.address = address;
    this.fiatCurrency = fiatCurrency;
    this.cryptoCurrency = cryptoCurrency;
    this.orderAmount = orderAmount;
    this.merchantRedirectUrl = redirectUrl;
  }
}

export interface WithdrawCryptoInfo {
  cryptoAddress: string;
  cryptoNetwork: string;
}

export interface AddressNonceMessage {
  message: string;
}

export interface AuthenticationResponse {
  authenticated: boolean;
  token?: string;
}

export interface Trade {
  address: string,
  bindingStatus: boolean,
  eternalRedirectUrl: string,
  expiredTime: number,
  internalOrderId: string,
  orderId: string,
  token: string
}
