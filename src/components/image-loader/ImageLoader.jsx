import React, { useRef, useState } from "react";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import "./ImageLoader.style.css";
import Icon from "../ui/Icon";
import Tooltip from "../tooltip/Tooltip";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ImageLoader = (props) => {
  const {
    maxNumber = 5,
    images = [],
    setImages,
    disabled = false,
    tooltip = "",
  } = props;
  const [t] = useTranslation("translation");
  const addInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const replaceIndexRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedFiles = (fileList) =>
    Array.from(fileList).filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));

  const handleAddFiles = (fileList) => {
    const files = acceptedFiles(fileList);
    if (!files.length) return;
    const room = Math.max(0, maxNumber - images.length);
    Promise.all(files.slice(0, room).map(fileToDataURL)).then((dataUrls) => {
      setImages([...images, ...dataUrls.map((image) => ({ image }))]);
    });
  };

  const handleReplaceFile = (file) => {
    if (!file || !ACCEPTED_IMAGE_TYPES.includes(file.type)) return;
    const index = replaceIndexRef.current;
    fileToDataURL(file).then((image) => {
      setImages(images.map((img, i) => (i === index ? { image } : img)));
    });
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleAddFiles(e.dataTransfer.files);
  };

  return (
    <>
      <div className="image-label-box">
        {tooltip.length > 0 ? (
          <Tooltip tooltipContent={tooltip}>
            <div className="image-label">
              {` ${t("form.imatges")} `}
              <Icon icon="tooltip" />
            </div>
          </Tooltip>
        ) : (
          <div className="image-label">{` ${t("form.imatges")} `}</div>
        )}
      </div>
      <div className={`image-box ${images?.length > 0 ? "image-box--has-images" : "image-box--no-images"}`}>
        <input
          ref={addInputRef}
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          style={{ display: "none" }}
          onChange={(e) => {
            handleAddFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={replaceInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          style={{ display: "none" }}
          onChange={(e) => {
            handleReplaceFile(e.target.files[0]);
            e.target.value = "";
          }}
        />
        <div className="upload__image-wrapper">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.image} alt="" width="100" />
              <div className="btn-wrapper">
                <Icon
                  icon="replay"
                  type="hoverable-cream"
                  onClick={() => {
                    if (disabled) return;
                    replaceIndexRef.current = index;
                    replaceInputRef.current?.click();
                  }}
                />
                <Icon
                  icon="trash"
                  type="hoverable-cream"
                  onClick={() => !disabled && handleRemove(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="btn-wrapper">
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
              if (!disabled) addInputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!disabled) setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
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
                  setImages([]);
                }
              }}
            >
              {t("form.elimina-imatges")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageLoader;
