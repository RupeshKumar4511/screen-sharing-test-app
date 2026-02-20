import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import ScreenTest from "./components/ScreenTest.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
      </Routes>
    </BrowserRouter>
  );
}