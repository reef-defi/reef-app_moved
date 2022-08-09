import { defaultOptions, DefaultOptions } from '@reef-defi/react-lib';
import { createContext } from 'react';

export default createContext<DefaultOptions>(defaultOptions);
