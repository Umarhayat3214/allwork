import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Compo/Home";
import View from "./Compo/View";
import Edit from "./Compo/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
