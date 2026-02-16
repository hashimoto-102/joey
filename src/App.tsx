import TomatoClock from "./pages/TomatoClock";
import "./App.css";
import "./i18n";

import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TomatoClock />} />
    </Routes>
  );
}

export default App;
