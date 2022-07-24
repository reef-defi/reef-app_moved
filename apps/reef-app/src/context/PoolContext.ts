import { createContext } from 'react';
import { LastPoolReserves } from '@reef-defi/react-lib';

export default createContext<LastPoolReserves[]>([]);
