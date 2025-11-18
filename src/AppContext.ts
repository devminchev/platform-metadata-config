import { createContext } from 'react';

type GameType = {
  type: string;
  [key: string]: string | string[] | boolean | number | null | undefined;
}

export type ContextFields = {
  mobileOverride: boolean;
  gameSkin: string;
  name: string;
  demoUrl: string;
  realUrl: string;
  rtp?: number;
  gameLoaderFileName?: string;
  mobileName?: string;
  mobileGameSkin?: string;
  mobileDemoUrl?: string;
  mobileRealUrl?: string;
  mobileGameLoaderFileName?: string;
  gameStudio?: string;
  gameProvider?: string;
  gameAggregator?: string;
  gameType: GameType;
  subGameType?: string;
  federalGameType?: string;
}

export type AppContextType = {
  fields: ContextFields;
  formErrors: {
    platformConfig: boolean;
    metadataConfig: boolean;
  }
  setContext: (values: Partial<ContextFields>) => void;
  setFormStatus: (values: Partial<Record<string, boolean>>) => void;
};

export const appDefaultValues = {
  fields: {
    mobileOverride: false,
    gameSkin: "",
    name: "",
    demoUrl: "",
    realUrl: "",
    gameLoaderFileName: "",
    mobileName: "",
    mobileGameSkin: "",
    mobileRealUrl: "",
    mobileDemoUrl: "",
    mobileGameLoaderFileName: "",
    gameStudio: "",
    gameProvider: "",
    gameAggregator: "",
    gameType: {
      type: ''
    },
    subGameType: "",
    federalGameType: "",
  },
  formErrors: {
    platformConfig: false,
    metadataConfig: false
  },
  setContext: () => { },
  setFormStatus: () => { }
};

const AppContext = createContext<AppContextType>(appDefaultValues);

export default AppContext;
