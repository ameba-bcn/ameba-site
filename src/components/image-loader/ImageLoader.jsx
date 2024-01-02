import React from "react";
import ImageUploading from "react-images-uploading";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import ReplayIcon from "@material-ui/icons/Replay";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  StyledImageBox,
  StyledImageLabel,
  StyledImageLabelBox,
} from "./ImageLoader.style";

const ImageLoader = (props) => {
  const { maxNumber = 6, images = [], setImages, disabled = false } = props;
  const [t] = useTranslation("translation");

  const onChange = (imageList, addUpdateIndex) => {
    if (!disabled) setImages(imageList);
  };
  return (
    <>
      <StyledImageLabelBox>
        <StyledImageLabel>{` ${t("form.imatges")} `}</StyledImageLabel>
      </StyledImageLabelBox>
      <StyledImageBox imageList={images}>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="image"
          acceptType={["jpg", "jpeg", "gif", "png"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <>
              <div className="upload__image-wrapper">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.image} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <ReplayIcon
                        onClick={() => !disabled && onImageUpdate(index)}
                      />
                      <DeleteOutlineIcon
                        onClick={() => !disabled && onImageRemove(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  buttonSize="boton--small"
                  buttonStyle="boton--primary--outline"
                  hoverStyle="bg-cream"
                  style={isDragging ? { color: "red" } : undefined}
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    !disabled && onImageUpload();
                  }}
                  {...dragProps}
                >
                  {t("form.carrega-imatges")}
                </Button>
                &nbsp;
                {images?.length !== 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize="boton--small"
                    buttonStyle="boton--primary--outline"
                    hoverStyle="bg-cream"
                    disabled={disabled}
                    onClick={(e) => {
                      if (!disabled) {
                        e.preventDefault();
                        onImageRemoveAll();
                        setImages([]);
                      }
                    }}
                  >
                    {t("form.elimina-imatges")}
                  </Button>
                )}
              </div>
            </>
          )}
        </ImageUploading>
      </StyledImageBox>
    </>
  );
};

export default ImageLoader;
