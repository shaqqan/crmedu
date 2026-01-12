import React, { PropsWithChildren } from "react";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ColorModeContextProvider } from "@/shared/contexts";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{
          html: { WebkitFontSmoothing: "auto" },
          "html, body, #root": {
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "hidden"
          }
        }} />
        <RefineSnackbarProvider>
          <DevtoolsProvider>{children}</DevtoolsProvider>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  );
};
