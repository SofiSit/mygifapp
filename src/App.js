import { useState } from "react";
import styled from "styled-components";
import Button from "./Components/Button";
import Header from "./Components/Header";
import Favorites from "./Components/Favorites";
import Random from "./Components/Random";
import Search from "./Components/Search";
import Trending from "./Components/Trending";
import { useGlobal } from "./context/global";
import { useTheme } from "./context/themeContext";
import Cats from "./Components/Cats";
import UploadImage from "./Components/UploadImage";

function App() {
  const {randomGiff} = useGlobal()
  const theme = useTheme()

  //state
  const [rendered, setRendered] = useState('trending')

  const content = () => {
    switch(rendered){
      case 'trending':
        return <Trending />
      case 'liked':
        return <Favorites rendered={rendered} />
      case 'random':
        return <Random />
      case 'search':
        return <Search />
        case 'cat':
          return <Cats />
          case 'uploadImage':
            return <UploadImage />
      default:
        return <Trending />
    }
  }

  return (
    <AppStyled theme={theme}>
      <Header setRendered={setRendered} />
      <div className="fetch-btns">
        <Button 
          name={'Liked'}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => {
            setRendered('liked')
          }}
        />
        <Button 
          name={'Trending Gifs'}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => {
            setRendered('trending')
          }}
        />
         <Button 
          name={'Cat Gifs'}
          icon={<i className="fa-solid fa-cat"></i>}
          onClick={() => {
            setRendered('cat')
          }}
        />
        <Button 
          name={'Babys Gif'}
          icon={<i class="fa-solid fa-baby"></i>}
          onClick={() => {
            setRendered('random')
            randomGiff()
          }}
        />
        <Button 
          name={'Upload Gif'}
          icon={<i class="fa-solid fa-file-arrow-up"></i>}
          onClick={() => {
            setRendered('uploadImage')
          }}
        />
      </div>
      <main>
        {content()}
      </main>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colorBg1};

  .fetch-btns{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  main{
    padding: 2rem 8rem;
    @media screen and (max-width: 1300px){
      padding: 2rem 4rem;
    }
  }
`;

export default App;