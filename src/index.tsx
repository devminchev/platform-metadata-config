import { createRoot } from "react-dom/client";
import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

import { AppProvider } from "./AppProvider";
import Field from "./locations/Field";
import LocalhostWarning from "./components/LocalhostWarning";

const container = document.getElementById("root");
const root = createRoot(container!);

if (process.env.NODE_ENV === "development" && window.self === window.top) {
  root.render(<LocalhostWarning />);
} else {
  root.render(
    <SDKProvider>
      <GlobalStyles />
      <AppProvider>
        <Field />
      </AppProvider>
    </SDKProvider>
  );
}
