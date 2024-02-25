import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<h1>Hola</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
