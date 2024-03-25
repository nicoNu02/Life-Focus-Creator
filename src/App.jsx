import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

import { DatabaseProvider } from "./contexts/DatabaseContext";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="/tasks"
            element={
              <DatabaseProvider>
                <Tasks />
              </DatabaseProvider>
            }
          />
          <Route path="/notes" element={<h1>Hola</h1>} />
          <Route path="/timer" element={<h1>Timer</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
