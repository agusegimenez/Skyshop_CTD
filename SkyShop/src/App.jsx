import {Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Body from './Components/Body';
import Footer from "./Components/Footer";
import Detail from './Routes/Detail'; // La vista para los detalles de la card
import './index.css';
import Login from './Routes/Login';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path="/details/:id" element={<Detail />} /> {/* Ruta para los detalles */}
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;