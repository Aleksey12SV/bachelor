import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './lib/i18n.ts'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      accentColor="mint"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="full"
    >
      <App />
    </Theme>
  </React.StrictMode>
);
