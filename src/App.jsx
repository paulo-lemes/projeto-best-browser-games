import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { GamesProvider } from "./contexts/GamesContext";
import Router from "./routes";

function App() {
  return (
    <>
      <GamesProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </GamesProvider>
    </>
  );
}

export default App;
