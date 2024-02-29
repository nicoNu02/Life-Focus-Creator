import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Tasks from "./components/Tasks";
import { DatabaseProvider } from "./contexts/DatabaseContext";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Sidebar />
        <DatabaseProvider>
          <Routes>
            <Route path="/" element={<h1>Hola2</h1>} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<h1>Hola</h1>} />
          </Routes>
        </DatabaseProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
