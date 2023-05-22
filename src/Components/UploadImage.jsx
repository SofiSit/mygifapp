import React from 'react'
import styled, { useTheme } from 'styled-components'

const UploadImage = () => {


  const theme = useTheme();
  

  const upload = <i class="fa-solid fa-file-arrow-up"></i>




  return (
    <UploadStyles theme={theme}>
     <h2>{upload}Upload Gif</h2>
     
  
      </UploadStyles>
  )
}


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

export default UploadImage