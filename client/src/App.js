import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
