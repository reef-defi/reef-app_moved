import {
  Pool, Token, TokenWithAmount, utils,
} from '@reef-defi/react-lib';
import { reloadSignersSubj } from './accountState';
import { UpdateAction } from './updateCtxUtil';

export const combineTokensDistinct = ([tokens1, tokens2]:[Token[], Token[]]): Token[] => {
  const combinedT = [...tokens1];
  tokens2.forEach((vT: Token) => (!combinedT.some((cT) => cT.address === vT.address) ? combinedT.push(vT) : null));
  return combinedT;
};

export const toTokensWithPrice = ([tokens, reefPrice, pools]:[Token[], number, Pool[]]): TokenWithAmount[] => tokens.map((token) => ({ ...token, price: utils.calculateTokenPrice(token, pools, reefPrice) } as TokenWithAmount));

export const onTxUpdateReloadSignerBalances = (txUpdateData: utils.TxStatusUpdate, updateActions: UpdateAction[]): void => {
  if (txUpdateData?.isInBlock || txUpdateData?.error) {
    const delay = txUpdateData.txTypeEvm ? 2000 : 0;
    setTimeout(() => reloadSignersSubj.next({ updateActions }), delay);
  }
};
