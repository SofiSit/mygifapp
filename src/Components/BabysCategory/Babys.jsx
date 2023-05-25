import React from 'react'
import styled from 'styled-components'
import { useGlobal } from '../../context/global';
import { useTheme } from '../../context/themeContext';
import GiffItem from '../Giffs/GiffItem';
import Loader from '../Loader/Loader';
import Masonry from 'react-masonry-css';

function Random() {
    const {random, loading} = useGlobal()
    const theme = useTheme()
    const baby = <i class="fa-solid fa-baby"></i>


    const breakpointColumnsObj = {
        default: 4,
        1400: 3,
        977: 2,
        500: 1
    };

    return (
        <BabysStyled theme={theme}>
            <h2>{baby}Babys Gif</h2>
            {loading && <Loader />}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                
                {
                    random.map((giff) => {
                        return <GiffItem key={giff.id} {...giff} giffItem={giff} />
                    })
                }
            </Masonry>
        </BabysStyled>
    )
}

const BabysStyled = styled.article`
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
    .my-masonry-grid {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
        margin-left: -20px; /* gutter size offset */
        width: auto;
    }
    .my-masonry-grid_column {
        padding-left: 20px; /* gutter size */
        background-clip: padding-box;
    }

    /* Style your items */
    .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
        margin-bottom: 15px;
    }
`;


export default Random