import { Refine } from "@refinedev/core";
import { DevtoolsPanel } from "@refinedev/devtools";
import { RefineKbar } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/mui";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter } from "react-router";

import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { dataProvider, i18nProvider } from "@/shared/providers";
import { DevRoleSwitcher } from "@/shared";
import "@/shared/i18n";

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={useNotificationProvider}
          routerProvider={routerProvider}
          i18nProvider={i18nProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "pQfxSI-nL0wvF-AFRySf",
          }}
        >
          <AppRoutes />
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <DevtoolsPanel />
        <DevRoleSwitcher />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
