import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import TestTable from "./components/Table";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/table" element={<TestTable />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
