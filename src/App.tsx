import { SiteShell } from "./components/SiteShell";
import { MarinePage } from "./features/marine/MarinePage";
import { ToolsPage } from "./features/tools/ToolsPage";
import { HomePage } from "./pages/HomePage";

function currentPage() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/marine")) return <MarinePage />;
  if (path.endsWith("/tools")) return <ToolsPage />;
  return <HomePage />;
}

export function App() {
  return <SiteShell>{currentPage()}</SiteShell>;
}
