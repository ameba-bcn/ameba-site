import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { useFormik } from "formik";
import { validate } from "./MemberProjectValidate";
import InputField from "../../../components/forms/InputField/InputField";
import { LogFormBox, LogFormError } from "../../../components/forms/Log.style";
import {
  MemberProjectFrame,
  StyledImageBox,
  StyledImageLabel,
  StyledImageLabelBox,
} from "./MemberProject.style";
import Button from "../../../components/button/Button";
import { isEmptyObject } from "../../../utils/utils";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import TextArea from "../../../components/forms/TextArea/TextArea";
import authService from "../../../redux/services/auth.service";

const MemberProject = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    authService
      .getMemberProject()
      .then((data) => {
        console.log("recibimos data y seteamos valores", data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const maxNumber = 4;

  const handleSubmitLogin = (val) => {
    console.log("val", { ...val, bio: bioText });
    // authService.updateMemberProject({});
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      bio: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  const demoText =
    "instrucciones de en que consiste visualizar tu proyecto, etc";
  console.log(bioText);
  return (
    <MemberProjectFrame>
      <DisclaimerBox
        text={demoText}
        id="project-disclaimer"
        borderColor="black"
      />
      <LogFormBox>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputField
              id="title"
              name="title"
              type="text"
              label="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              slimLine={true}
              valid={true}
            />
          </div>
          <TextArea
            id="bio"
            name="bio"
            bioText={bioText}
            setBioText={setBioText}
          />
          <div>
            <InputField
              id="media"
              name="media"
              type="text"
              label="link"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              slimLine={true}
              valid={true}
            />
          </div>
          <StyledImageLabelBox>
            <StyledImageLabel>{` images `}</StyledImageLabel>
          </StyledImageLabelBox>
          <StyledImageBox>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
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
                // write your building UI
                <div className="upload__image-wrapper">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize="boton--medium"
                    buttonStyle="boton--primary--outline"
                    hoverStyle="bg-cream"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </Button>
                  &nbsp;
                  {images.length !== 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      buttonSize="boton--medium"
                      buttonStyle="boton--primary--outline"
                      hoverStyle="bg-cream"
                      onClick={() => onImageRemoveAll}
                    >
                      Remove all images
                    </Button>
                  )}
                </div>
              )}
            </ImageUploading>
          </StyledImageBox>

          {!isEmptyObject(formik.errors) && (
            <LogFormError>
              {Object.values(formik.errors).map((x) => {
                return <div key={x}>{x}</div>;
              })}
            </LogFormError>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--solid"
            hoverStyle="bg-orange"
          >
            {loading ? <span className="spinner-border"></span> : <>guarda</>}
          </Button>
        </form>
      </LogFormBox>
    </MemberProjectFrame>
  );
};

export default MemberProject;
