import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/LoginForm";
import Dashboard from "./containers/Dasnboard";
import Compare from "./components/Encode";
import Merge from "./components/Merge";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateKey from "./components/CreateKey";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/key" element={<CreateKey />}></Route>
        <Route path="/compare" element={<Compare />}></Route>
        <Route path="/merge" element={<Merge />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
