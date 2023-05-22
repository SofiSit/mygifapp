import React, { useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/globalReducer";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import {
  ADD_TO_FAVORITES,
  GET_CAT,
  GET_FAVOURITES,
  GET_RANDOM,
  GET_SEARCH,
  GET_TRENDING,
  LOADING,
} from "../utils/globalActions";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = "https://api.giphy.com/v1/gifs";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = {
    loading: false,
    searchResults: [],
    trending: [],
    favorites: [],
    random: {},
    cat: [],
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  //get trending gif
  const getTrending = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/trending?api_key=${apiKey}&limit=30`
    
    );
    dispatch({ type: GET_TRENDING, payload: res.data.data });
  };
  //random giff
  const randomGiff = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(`${baseUrl}/search?q=babys&api_key=${apiKey}`);
    dispatch({ type: GET_RANDOM, payload: res.data.data });
  };

  //get cat gif
  const getCats = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/search?q=cat&api_key=${apiKey}&limit=15`
    );
    dispatch({ type: GET_CAT, payload: res.data.data });
    console.log("cat", res);
  };

  //search
  const searchGiffs = async (query) => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/search?api_key=${apiKey}&q=${query}&limit=18`
    );
    dispatch({ type: GET_SEARCH, payload: res.data.data });
  };

  //save to favs
  const saveToFavourites = (gif) => {
    const storedItems = JSON.parse(window.localStorage.getItem("myFavourites")) || []
    const existingItem = storedItems.find(item => item.id === gif.id);

    if(!existingItem){
        const items = [...storedItems, gif]
        window.localStorage.setItem("myFavourites", JSON.stringify(items));
        dispatch({type: ADD_TO_FAVORITES, payload: gif});
        toast.success('Successfully created!');
        console.log('done')
    }else{
        alert('Already Exist');
    }
}

const removeFromLocalStorage = (gif) => {
    const storedItems = JSON.parse(window.localStorage.getItem("myFavourites")) || []
    const items = storedItems.filter((item) => item.id !== gif.id)
    window.localStorage.setItem('myFavourites', JSON.stringify(items))

    //get updated list
    getFromLocalStorage()
}


const getFromLocalStorage = () => {
    const storedItems = JSON.parse(window.localStorage.getItem("myFavourites")) || []
    dispatch({type: GET_FAVOURITES, payload: storedItems})
}




  //INITIAL RENDERS
  useEffect(() => {
    getTrending();
    randomGiff();
    getCats();
    getFromLocalStorage();
  }, []);

  //console.log(state);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        randomGiff,
        searchGiffs,
        saveToFavourites,
        removeFromLocalStorage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobal = () => {
  return useContext(GlobalContext);
};
