import React, { useState } from 'react'
import customCss from "./AñadirProd.module.css"
import axios from 'axios';

const AñadirProd = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [imagen, setImagen] = useState(""); // estado que guarda la imagen subida al navegador
    const [imgFile, setImgFile] = useState(null); // estado que guarda la imagen en formato archivo
    const [imageCloudUrl, setImageCloudUrl] = useState(""); // estado q guarda el link de la url de la imagen en Cloudinary
    const [error, setError] = useState(false);

    const resetForm = () => {
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setCategorias([]);
      setImagen("");
      setImgFile(null);
      setImageCloudUrl("");
  };

    const handleImagenSubida = (e) => {
      const file = e.target.files[0]; // Selecciona solo el primer archivo
      setImgFile(file);
      const nuevaImagen = URL.createObjectURL(file);
      setImagen(nuevaImagen); // Reemplaza la imagen anterior si la hubiera
  };

  // subida de imagen a Cloudinary
  // (implementacion cuando se pueda agregar productos al back-end)
  const uploadImageToCloudinary  = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'x1kdwphk');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dqeczcnjq/image/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleCategory = (e) => {
      const value = e.target.value;
      setCategorias([...categorias, value]);
  }
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(productName.trim() === "") {
          setError(true);
      }else {
          setError(false);
          let url = "";
          // se ejecuta subida de img a Cloudinary si no hay errores y si hay una imagen seleccionada
          if(imgFile !== null){
            url = await uploadImageToCloudinary(imgFile);
            if (url) {
              setImageCloudUrl(url);
            } else {
              console.error("Error uploading image");
              return;
            }
          }
          if(imagen === "" || imgFile === null){
            console.error("Error uploading image");
          }
          // cambiar esto con POST a API
          console.log('Producto guardado', { productName, productDescription, productPrice, categorias, imageCloudUrl });
          //limpiar los inputs si se guardo bien el producto
          resetForm();
      }
  }
  return (
     <form onSubmit={handleSubmit} className={customCss.productForm}>
            <h2>Datos del Producto</h2>
            <label>Imagen:</label>
            <div className={customCss.imgPreview}>
                {/* Vista previa de imágenes */}
                {
                  imagen !== "" && <img src={imagen} className={customCss.imgThumbnail} />
                }
                {/* Botón para agregar más imágenes */}
                <label className={customCss.addImage}>
                    <input 
                        type="file" 
                        accept='image/*'  
                        onChange={handleImagenSubida} 
                        style={{ display: 'none' }} 
                    />
                    <div className={customCss.plusIcon}>+</div>
                </label>
            </div>
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