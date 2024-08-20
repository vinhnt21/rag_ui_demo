import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import AddDocs from "./pages/ManageDocs";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/add-docs" element={<AddDocs />} />
            </Routes>
        </Router>
    );
}

export default App;
