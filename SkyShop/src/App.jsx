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
import AñadirProd from './Routes/AñadirProd';
import Carrito from './Routes/Carrito';
import EditProd from './Routes/EditProd';
import PanelFavoritos from './Routes/PanelFavoritos';
import WhatsAppBoton from './Components/WhatsAppBoton';


function App() {

  return (
    <div className='padre'>
      <Header />
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path="/details/:id" element={<Detail />} /> {/* Ruta para los detalles */}
        <Route path="/register" element={<Create/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<PanelAdmin/>} />
        <Route path="/admin/edit/product/:id" element={<EditProd />} />
        <Route path="/user" element={<UserDetail/>} />
        <Route path="/addProd" element={<AñadirProd/>}/>
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/panel" element={<PanelFavoritos/>} />
      </Routes>

      <Suscribe/>
      <Footer/>
    </div>
  );
}

export default App;