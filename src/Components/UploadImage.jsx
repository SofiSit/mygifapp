import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTheme } from '../context/themeContext';
import Button from './Button';

const Dropzone = () => {

  const upload = <i class="fa-solid fa-file-arrow-up"></i>
  const theme = useTheme()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURL] = useState(null);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  

  const saveFileNamesToLocalStorage = (fileNames) => {
    localStorage.setItem('fileNames', JSON.stringify(fileNames));
  };
  
  // Función para guardar las imágenes en el almacenamiento local
  const saveImagesToLocalStorage = (urls) => {
    localStorage.setItem('selectedImages', JSON.stringify(urls));
  };
  
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
  
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
  
    const updatedURLs = [...previewURLs];
    const updatedFileNames = [...fileNames];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mbgsjubx');
  
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dwfbkwpv9/image/upload',
          formData
        );
  
        const url = response.data.secure_url;
        const fileName = file.name;
  
        updatedURLs.push(url);
        updatedFileNames.push(fileName);
      }
  
      setPreviewURLs(updatedURLs);
      saveImagesToLocalStorage(updatedURLs);
      setFileNames(updatedFileNames);
      saveFileNamesToLocalStorage(updatedFileNames);
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeImage = (url) => {
    const updatedURLs = previewURLs.filter((prevURL) => prevURL !== url);
    const updatedFiles = selectedFiles.filter((file) => file && file.previewURL !== url);
  
    setPreviewURLs(updatedURLs);
    setSelectedFiles(updatedFiles);
    saveImagesToLocalStorage(updatedURLs);
  };
 
  useEffect(() => {
    const storedImages = localStorage.getItem('selectedImages');
    const storedFileNames = localStorage.getItem('fileNames');
    if (storedImages && storedFileNames) {
      const images = JSON.parse(storedImages);
      const fileNames = JSON.parse(storedFileNames);
      setPreviewURLs(images);
      setSelectedFiles(images.map((url) => ({ previewURL: url })));
      setFileNames(fileNames);
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
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    977: 2,
    500: 1
};
  
  
return (
  <UploadStyle theme={theme}>
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
    {editIndex === index ? (
      <input
        type="text"
        value={fileNames[index]}
        onChange={(e) => {
          const updatedFileNames = [...fileNames];
          updatedFileNames[index] = e.target.value;
          setFileNames(updatedFileNames);
        }}
      />
    ) : (
      <div style={{color:'white'}}>{fileNames[index]}</div>
    )}
    <button
      name={editIndex === index ? 'Save' : 'Edit'}
      onClick={() => {
        if (editIndex === index) {
          setEditIndex(-1);
        } else {
          setEditIndex(index);
        }
      }}
    >
      {editIndex === index ? 'Save' : 'Edit'}
    </button>
    <button name={'Remove'} onClick={() => removeImage(url)}>
      Remove
    </button>
  </li>
))}
  </ul>
      
    </div>
  </UploadStyle>
);}

const UploadStyle = styled.article`
padding: 2rem;
background-color: ${(props) => props.theme.colorBg1};
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
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    background-color: ${(props) => props.theme.colorBg2};    width: 700px;
    margin: 0 auto;
  }
  button{
    background: linear-gradient(to right, 
      ${(props) => props.theme.colorBlue2}, 
      ${(props) => props.theme.colorGreen2}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  
  .dropzone label {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colorWhite};
    display: flex;
    align-items: center;
    gap: 1rem;
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
 