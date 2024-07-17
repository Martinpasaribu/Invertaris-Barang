
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Monitoring from "./components/Monitoring";
import Data from "./components/Data";
import Buat from "./components/Buat";
import Cek from "./components/cek";

function App() {
  return (
  <div > 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Monitoring/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/buat" element={<Buat/>}/>
        <Route path="/cek" element={<Cek/>}/>
        {/* harus kata besar didepan*/}
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
