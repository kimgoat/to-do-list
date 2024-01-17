import MainBoard from './components/MainBoard';
import { DarkModeProvider } from "./context/DarkModeContext";



function App() {
  return (
    <DarkModeProvider>
      <MainBoard />
    </DarkModeProvider>
  );
}

export default App;
