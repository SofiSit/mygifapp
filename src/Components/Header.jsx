import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/themeContext";
import { useGlobal } from "../context/global";

const search = <i className="fa-solid fa-magnifying-glass"></i>;

const Header = ({setRendered}) => {
  const {searchGiffs} = useGlobal()

  const theme = useTheme()

  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
      e.preventDefault()
      searchGiffs(query)
      setRendered('search')
      setQuery('')

      if(query === ''){
          setRendered('trending')
      }
  }

  const handleChange = (e) => {
      setQuery(e.target.value)
  }

  return (
    <HeaderStyle theme={theme}>
      <div className="logo">
        <span>Powered by</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 164 35"
          className="Svg-sc-jx1qpn fPCwho"
        >
          <g>
            <path fill="#00ff99" d="M0 3h4v29H0z"></path>
            <path fill="#9933ff" d="M24 11h4v21h-4z"></path>
            <path fill="#00ccff" d="M0 31h28v4H0z"></path>
            <path fill="#fff35c" d="M0 0h16v4H0z"></path>
            <path fill="#ff6666" d="M24 8V4h-4V0h-4v12h12V8"></path>
            <path fill="#121212" opacity="0.4" d="M24 16v-4h4M16 0v4h-4"></path>
          </g>
          <g fill="#ffffff">
            <path d="M59.1 12c-2-1.9-4.4-2.4-6.2-2.4-4.4 0-7.3 2.6-7.3 8 0 3.5 1.8 7.8 7.3 7.8 1.4 0 3.7-.3 5.2-1.4v-3.5h-6.9v-6h13.3v12.1c-1.7 3.5-6.4 5.3-11.7 5.3-10.7 0-14.8-7.2-14.8-14.3 0-7.1 4.7-14.4 14.9-14.4 3.8 0 7.1.8 10.7 4.4L59.1 12zM68.2 31.2V4h7.6v27.2h-7.6zM88.3 23.8v7.3h-7.7V4h13.2c7.3 0 10.9 4.6 10.9 9.9 0 5.6-3.6 9.9-10.9 9.9h-5.5zm0-6.5h5.5c2.1 0 3.2-1.6 3.2-3.3 0-1.8-1.1-3.4-3.2-3.4h-5.5v6.7zM125 31.2V20.9h-9.8v10.3h-7.7V4h7.7v10.3h9.8V4h7.6v27.2H125zM149.2 13.3l5.9-9.3h8.7v.3l-10.8 16v10.8h-7.7V20.3L135 4.3V4h8.7l5.5 9.3z"></path>
          </g>
        </svg>
      </div>
      
      <form action="" onSubmit={handleSubmit}>
                <div className="input-control">
                    <input type="text" value={query} onChange={handleChange}  placeholder="Search for all GIFs"  />
                    <button className="submit-btn">
                        {search}
                    </button>
                </div>
            </form>
    {/*   <button className="button_header hover-menu">
        <h2>Create</h2>
      </button> */}
      <div className="user_header">
        <img
          className="profile_img"
          src="https://media.giphy.com/avatars/default4/80h.gif"
          alt="pic"
        ></img>
        <p>SofiSit</p>
        <span className="account-menu__ArrowContainer-sc-tlpxqg-4 biFqZu">
          <svg
            rotate="0"
            width="14px"
            height="10px"
            viewBox="0 0 14 10"
            version="1.1"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow__SVGArrow-sc-j1im55-0 juFNKK"
          >
            <g id="Landing-Page-Design" stroke="none" fill="none">
              <g
                id="mobile-header"
                transform="translate(-181.000000, -695.000000)"
              >
                <g
                  id="icons/utility/next"
                  transform="translate(188.000000, 699.000000) rotate(-270.000000) translate(-188.000000, -699.000000) translate(173.000000, 684.000000)"
                >
                  <mask id="mask-2" fill="white">
                    <path d="M13.8506611,8.07692308 C13.9182696,8.07692308 13.9858771,8.10396608 14.0534856,8.15805288 L20.6926082,14.7904147 C20.746695,14.8490087 20.773738,14.9188698 20.773738,15 C20.773738,15.0811302 20.746695,15.1509913 20.6926082,15.2095853 L14.0534856,21.8419471 C13.9993988,21.9005412 13.9306645,21.9298377 13.8472806,21.9298377 C13.7638968,21.9298377 13.6951625,21.9005412 13.6410757,21.8419471 L11.6195913,19.8204627 C11.5655045,19.7663759 11.5384615,19.6976416 11.5384615,19.6142578 C11.5384615,19.530874 11.5655045,19.4621397 11.6195913,19.4080529 L16.0276442,15 L11.6195913,10.5919471 C11.5655045,10.5378603 11.5384615,10.469126 11.5384615,10.3857422 C11.5384615,10.3023584 11.5655045,10.2336241 11.6195913,10.1795373 L13.6410757,8.15805288 C13.7086842,8.10396608 13.7785453,8.07692308 13.8506611,8.07692308 Z"></path>
                  </mask>
                  <path
                    d="M13.8506611,8.07692308 C13.9182696,8.07692308 13.9858771,8.10396608 14.0534856,8.15805288 L20.6926082,14.7904147 C20.746695,14.8490087 20.773738,14.9188698 20.773738,15 C20.773738,15.0811302 20.746695,15.1509913 20.6926082,15.2095853 L14.0534856,21.8419471 C13.9993988,21.9005412 13.9306645,21.9298377 13.8472806,21.9298377 C13.7638968,21.9298377 13.6951625,21.9005412 13.6410757,21.8419471 L11.6195913,19.8204627 C11.5655045,19.7663759 11.5384615,19.6976416 11.5384615,19.6142578 C11.5384615,19.530874 11.5655045,19.4621397 11.6195913,19.4080529 L16.0276442,15 L11.6195913,10.5919471 C11.5655045,10.5378603 11.5384615,10.469126 11.5384615,10.3857422 C11.5384615,10.3023584 11.5655045,10.2336241 11.6195913,10.1795373 L13.6410757,8.15805288 C13.7086842,8.10396608 13.7785453,8.07692308 13.8506611,8.07692308 Z"
                    fill="#FFFFFF"
                  ></path>
                  <g id="colors/primary/_master" mask="url(#mask-2)">
                    <g id="colors/primary/white"></g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
display: flex;
flex-wrap: nowrap;
padding:22px;
  background-color: ${(props) => props.theme.colorBg2};
  flex-direction: row;
  gap: 3rem;
  @media screen and (max-width: 1300px) {
    padding: 2rem 10rem;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    span {
      text-transform: uppercase;
      color: ${(props) => props.theme.colorGrey};
      font-size: 0.8rem;
    }
    svg {
      width: 10rem;
    }
  }
  .button_header {
    background-color: #6d63ff;
    width: 75px;
    height: 35px;
    display: flex;
    justify-content: center;
  }
  .user_header {
    width: 150px;
    display: flex;
    align-items: center;
    color: white;
  }
  .profile_img {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  form {
    width: 100%;
    .input-control {
      position: relative;
      width: 100%;
      input {
        position: relative;
        z-index: 10;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        padding: 1rem 2rem;
        outline: none;
        border: none;
        border-radius: 15px;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -0.3rem;
        transform: translateY(-50%);
        width: 100%;
        height: 100%;
        background: linear-gradient(
          45deg,
          rgb(153, 51, 255) 0%,
          rgb(255, 102, 102) 100%
        );
        background-size: 400% 400%;
        z-index: 1;
        padding: 0.3rem;
        transform: scale(0);
        border-radius: 1rem;
        transition: all 0.3s ease;
        animation: gradient 7s ease-in-out infinite;
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      }
      &:hover::after,
      &:focus-within::after {
        transform: scale(1) translateY(-50%);
      }

      .submit-btn {
        position: absolute;
        top: 50%;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-50%);
        border: none;
        outline: none;
        color: ${(props) => props.theme.colorWhite};
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        z-index: 10;
        height: 100%;
        padding: 0 1rem;
        border-radius: 15px;
        background: linear-gradient(
          to right,
          ${(props) => props.theme.colorPurple},
          ${(props) => props.theme.colorSalmon}
        );
        background-size: 400% 400%;
        animation: gradient 3s ease-in-out infinite;
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        i {
          font-size: 1.8rem;
          color: white;
        }
      }
    }
  }
`;

export default Header;
