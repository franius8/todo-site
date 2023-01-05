import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/done" element={<Done />} />
          <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}