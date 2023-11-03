import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Auth from "./components/auth";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
