/* import React, { useState } from "react";
import { Container, Input, FormGroup } from "reactstrap";
import styled from "styled-components";
const UploadImage = () => {
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "mbgsjubx");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwfbkwpv9/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImages(file.secure_url);
    console.log(file.secure_url);
    setLoading(false);
  };

  return (
    <div
    className="dropzone"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    <input
      type="file"
      id="file-input"
      multiple
      onChange={handleFileSelect}
    />
    <label htmlFor="file-input">Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</label>
    <ul>
      {selectedFiles.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  </div>
  );
};



const UploadStyles = styled.article`
padding: 2rem;
background-color: ${(props) => props.theme.colorBg2};
border-radius: 1rem;
h2{
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colorWhite};
    display: flex;
    align-items: center;
    gap: 1rem;
    i{
        background: linear-gradient(to right, 
            ${(props) => props.theme.colorBlue2}, 
            ${(props) => props.theme.colorGreen2}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

`;

export default UploadImage */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTheme } from '../context/themeContext';
import Button from './Button';

const Dropzone = () => {

  const upload = <i class="fa-solid fa-file-arrow-up"></i>
  const theme = useTheme()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURL, setPreviewURL] = useState(null);
  const [previewURLs, setPreviewURLs] = useState([]);
  

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
  
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
  
    const updatedURLs = [...previewURLs];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        updatedURLs.push(url);
        setPreviewURLs(updatedURLs);
        saveImagesToLocalStorage(updatedURLs);
      };
      reader.readAsDataURL(file);
    });
  };
  
  
  const removeImage = (url) => {
    const updatedImages = selectedFiles.filter((file) => file.previewURL !== url);
    setSelectedFiles(updatedImages);
    const updatedURLs = updatedImages.map((file) => file.previewURL);
    setPreviewURLs(updatedURLs);
    saveImagesToLocalStorage(updatedURLs);
  };
  
  const saveImagesToLocalStorage = (urls) => {
    localStorage.setItem('selectedImages', JSON.stringify(urls));
  };
  
  useEffect(() => {
    const storedImages = localStorage.getItem('selectedImages');
    if (storedImages) {
      const images = JSON.parse(storedImages);
      setPreviewURLs(images);
      setSelectedFiles(images.map((url) => ({ previewURL: url })));
    }
  }, []);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('file', file);
        formData.append('upload_preset', "mbgsjubx");
      });

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwfbkwpv9/image/upload',
        formData
      );

      console.log(response.data); // Aquí puedes manejar la respuesta de Cloudinary según tus necesidades

      // Restablecer el estado para eliminar los archivos seleccionados después de la carga exitosa
      setSelectedFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  
  
  return (
    <UploadStyle  theme={theme}>
      <h2>{upload}Upload your Gif</h2>
      <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
  <input type="file" id="file-input" multiple onChange={handleFileSelect} />
  <label htmlFor="file-input">
    Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
  </label>
  {previewURL && <img src={previewURL} alt="Preview" />}
 
  <ul>
  {previewURLs.map((url, index) => (
    <li key={index}>
      <img src={url} alt={`Preview ${index}`} />
      <button onClick={() => removeImage(url)}>Remove</button>
    </li>
  ))}
</ul>
</div>
    </UploadStyle>
   
  );
};

const UploadStyle = styled.article`
padding: 2rem;
background-color: ${(props) => props.theme.colorBg2};
border-radius: 1rem;

h2{
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colorWhite};
  display: flex;
  align-items: center;
  gap: 1rem;
  i{
    background: linear-gradient(to right, 
      ${(props) => props.theme.colorBlue2}, 
      ${(props) => props.theme.colorGreen2}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .dropzone {
    display: flex;
    flex-wrap: wrap;
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    background-color: #f9f9f9;
    width: 700px;
    margin: 0 auto;
  }
  
  .dropzone label {
    display: block;
    margin-bottom: 10px;
  }
  
  .dropzone input[type='file'] {
    display: none;
  }
  
  .dropzone ul {
    list-style: none;
    padding: 0;
  }
  
  .dropzone button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
.dropzone li {
  margin-bottom: 5px;
}`

export default Dropzone;
 