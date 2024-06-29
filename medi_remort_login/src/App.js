import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apbar from "./Compo/Apbar";
import Login from "./Compo/Login";
import Signup from "./Compo/Signup"
import Commonuser from "./Compo/Commonuser";

// import Task from "./Compo/Task"


function App() {
  return (
    <>
    {/*  <Task/> */}
   <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Apbar />} />
          <Route path="/commonuser/:user_id" element={<Commonuser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
