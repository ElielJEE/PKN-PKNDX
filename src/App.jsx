import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, Details } from "./Pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
