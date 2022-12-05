import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Profile from "./user/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h2>Page Donot Exist</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
