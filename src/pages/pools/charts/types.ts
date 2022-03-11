export const CHART_HEIGHT = 565;
export const CHART_MARGIN = { left: 60, right: 40, top: 10, bottom: 30 };

export interface DefaultChartType {
  width: number;
  ratio: number;
  fromDate: Date;
  toDate: Date;
  type?: "svg" | "hybrid";
  data: any[];
}


export interface BasicPoolInfo {
  address: string; // Pool address
  address1: string; // Token1 address
  address2: string; // Token1 address
  symbol1: string;
  symbol2: string;
  decimal1: number;
  decimal2: number;
}