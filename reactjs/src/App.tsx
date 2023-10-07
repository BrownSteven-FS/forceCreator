import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import CreateUnitPage from "./pages/CreateUnit";
import Header from "./components/Header";
import EditUnitPage from "./pages/EditUnit";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create" element={<CreateUnitPage />} />
        <Route path="/edit/:id" element={<EditUnitPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
