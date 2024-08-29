import React, { useState } from 'react'
import customCss from "./AñadirProd.module.css"

const AñadirProd = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState(false);

    const handleImagenSubida =  (e) => {
        setImagen(URL.createObjectURL(e.target.files[0]));
    };

    const handleCategory = (e) => {
        const value = e.target.value;
        setCategorias([...categorias, value]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(productName.trim() === "") {
            setError(true);
        }else {
            setError(false);
            console.log('Producto guardado', { productName, productDescription, productPrice, categorias, imagen });
        }
    }
  return (
    <form onSubmit={handleSubmit} className={customCss.productForm}>
        <h2>Datos del Producto</h2>
        <label>Imagen:</label>
        <div className={customCss.imgPreview}>
        {imagen && <img src={imagen} alt="Producto" />}
        </div>
        <input className={customCss.selecArch} type="file" accept='image/*' onChange={handleImagenSubida} />

        {/* Campo de nombre con validación */}
        <label>Nombre:</label>
        <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={`${customCss.nombre} ${error ? customCss.errorInput : ''}`}
        />
        {error && (
            <p className={customCss.errorMensaje}>
              El nombre del producto ya esta en uso, coloque un nombre diferente
            </p>
      )}

      {/* Campo de descripción */}
      <label className={customCss.descripcion}>Descripción:</label>
      <textarea
      className={customCss.textArea}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></textarea>


      {/* Campo de categorías */}
      <label>Categoría:</label>
      <div className={customCss.categories}>
        <div className={customCss.caracteristicas}>
        <label>
          <input
            type="checkbox"
            value="Alimentos"
            onChange={handleCategory}
          /><img src='./caracteristica_alimentos.png' alt='alimentos-logo'/>
          Alimentos
        </label>
        <label>
          <input
            type="checkbox"
            value="Higiene"
            onChange={handleCategory}
          />
          <img src="./caracteristica_higiene.png" alt="higiene-logo" />
          Higiene
        </label>
        <label>
          <input
            type="checkbox"
            value="Diversión"
            onChange={handleCategory}
          />
          <img src="./caracteristica_diversion.png" alt="diversion-logo" />
          Diversión
        </label>
        <label>
          <input
            type="checkbox"
            value="Mascotas"
            onChange={handleCategory}
          />
          <img src="./caracteristica_mascotas.png" alt="mascotas-logo" />
          Mascotas
        </label>
        <label>
          <input
            type="checkbox"
            value="Perros"
            onChange={handleCategory}
          />
          <img src="./caracteristica_perros.png" alt="perros-logo" />
          Perros
        </label>
        </div>
      </div>

       {/* Campo de precio */}
       <label>Precio:</label>
      <input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className={customCss.precio}
      />

        {/* Botón de guardar */}
        <button type="submit">Guardar producto</button>
    </form>
  )
}

export default AñadirProd