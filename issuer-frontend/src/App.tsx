// Imports
// ========================================================
import DebugPage from "./pages/Debug";
import RootProvider from "./providers";

// Main Component
// ========================================================
const App = () => {
  return (
    <RootProvider>
      <DebugPage />
    </RootProvider>
  );
};

// Exports
// ========================================================
export default App;
