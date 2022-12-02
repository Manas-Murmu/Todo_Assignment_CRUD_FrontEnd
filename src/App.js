import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./user/Dashboard";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Header from "./components/Header";

import Test from "./components/Test";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h2>Page Donot Exist</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
    //<Test />
  );
}

export default App;
