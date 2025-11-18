import React, { PropsWithChildren, ReactNode, useState } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";

import AppContext, {
  AppContextType,
  appDefaultValues,
  ContextFields,
} from "./AppContext";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = ({
  children,
}) => {
  const { field } = useSDK<FieldAppSDK>();
  const values = field.getValue();
  const contextValues = {
    ...appDefaultValues,
    fields: {
      ...appDefaultValues.fields,
      ...values,
    },
  };
  const [state, setState] = useState<any>(contextValues);

  const setContext = (newValues: Partial<ContextFields>) => {
    setState((currentValues: Partial<AppContextType>) => ({
      ...currentValues,
      fields: {
        ...currentValues.fields,
        ...newValues,
      },
    }));
  };

  const setFormStatus = (newValues: Partial<Record<string, boolean>>) => {
    setState((currentValues: Partial<AppContextType>) => ({
      ...currentValues,
      formErrors: {
        ...currentValues.formErrors,
        ...newValues,
      },
    }));
  };

  return (
    <AppContext.Provider value={{ ...state, setContext, setFormStatus }}>
      {children}
    </AppContext.Provider>
  );
};
