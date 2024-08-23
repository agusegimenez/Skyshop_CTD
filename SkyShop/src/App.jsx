import {Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Body from './Components/Body';
import Footer from "./Components/Footer";
import Detail from './Routes/Detail'; // La vista para los detalles de la card
import './index.css';
import Login from './Routes/Login';
import Create from './Routes/Create';
import { PanelAdmin } from './Routes/PanelAdmin';
import Suscribe from './Components/Suscribe';
import { UserDetail } from './Routes/UserDetail';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path="/details/:id" element={<Detail />} /> {/* Ruta para los detalles */}
        <Route path="/register" element={<Create/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<PanelAdmin/>} />
        <Route path="/user" element={<UserDetail/>} />
      </Routes>
      <Suscribe/>
      <Footer/>
    </>
  );
}

export default App;