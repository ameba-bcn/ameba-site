import React from 'react';
import { RViewerTrigger, RViewer } from 'react-viewerjs';
import styled from "styled-components";

const StyledGallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 100%;
    justify-content: space-evenly;
    img{
        width: auto;
        height: 333px;
        margin: 20px 0px;
        @media (max-width: 768px) {
            width: 280px;
            height: auto;
    }
    }
`

const Galeria = (props) => {
    const { images = [] } = props;
    return (
        <div>
            <RViewer imageUrls={images}>
                <StyledGallery>
                    {images.map((image, index) =>
                        <RViewerTrigger key={image}>
                            <img src={image} alt="" />
                        </RViewerTrigger>)}
                </StyledGallery>

            </RViewer>
        </div>
    );
};

export default Galeria;