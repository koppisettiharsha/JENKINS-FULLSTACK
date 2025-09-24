import AllTasks from "./Component/AllTasks";
import AddTask from "./Component/AddTask";
import EditTask from "./Component/EditTask";
import NavBar from "./Component/NavBar";
import NotFound from "./Component/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/all" element={<AllTasks />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
