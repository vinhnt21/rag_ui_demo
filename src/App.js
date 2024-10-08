import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import AddDocs from "./pages/AddDocs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/add-data" element={<AddDocs />} />
      </Routes>
    </Router>
  );
}

export default App;
