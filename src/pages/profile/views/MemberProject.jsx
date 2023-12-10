import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import InputField from "../../../components/forms/InputField/InputField";
import { LogFormError } from "../../../components/forms/Log.style";
import { MemberFormBox, MemberProjectFrame } from "./MemberProject.style";
import Button from "../../../components/button/Button";
import TextArea from "../../../components/forms/TextArea/TextArea";
import authService from "../../../redux/services/auth.service";
import { useTranslation } from "react-i18next";
import ImageLoader from "../../../components/image-loader/ImageLoader";
import MediaLinksForm from "./components/MediaLinksForm";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { setUploadedImages } from "../../../redux/actions/profile";
import { validate } from "./MemberProjectValidate";
import { ERROR } from "../../../utils/constants";
import CheckBox from "../../../components/layout/CheckBox";

const MemberProject = () => {
  const [initialProjectData, setInitialProjectData] = useState({});
  const [images, setImages] = useState(initialProjectData.image || []);
  const [isPublic, setIsPublic] = useState(initialProjectData.public || false);
  const [description, setDescription] = useState(
    initialProjectData.description || ""
  );
  const [storedImages, setStoredImages] = useState([]);
  const [mediaLinks, setMediaLinks] = useState(
    initialProjectData.media_urls || []
  );
  const isActive = initialProjectData.isActive;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [t] = useTranslation("translation");

  useEffect(() => {
    authService
      .getMemberProject()
      .then((data) => {
        setLoading(false);
        setInitialProjectData(data);
        setIsPublic(data.public);
        setImages(Array(data.image));
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (val) => {
    if (description.length === 0) {
      setDescription(null);
    }
    if (images?.length === 0) {
      setImages(null);
    } else {
      authService.updateMemberProject({
        ...val,
        description: description,
        media_urls: mediaLinks,
        image: images,
        public: isPublic || false,
      });
    }
  };

  const uploadImage = () => {
    images.map((img) => {
      authService.uploadImage(img).then((data) => {
        const { image } = data;
        // setStoredImages(storedImages.push(image));
        dispatch(setUploadedImages(String(image)));
      });
    });
  };
  console.log("initialProjectData", initialProjectData);
  const formik = useFormik({
    initialValues: {
      ...initialProjectData,
      images: initialProjectData?.images,
      links: initialProjectData?.media_urls,
    },
    enableReinitialize: true,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const gralText =
    "En aquesta vista pots editar el teu projecte personal. Un cop guardats els canvis podràs visualitzar-ho a la vista de /soci@s";
  const noMemberText =
    "Sembla que la teva membresia ha expirat. Per a poder editar el teu projecte personal, has de renovar la teva membresia.";

  return (
    <MemberProjectFrame>
      <MemberFormBox>
        <form className="formMembership" onSubmit={formik.handleSubmit}>
          <DisclaimerBox
            text={isActive ? gralText : noMemberText}
            id="project-disclaimer"
            borderColor="black"
          />
          <div className="field-wrapper">
            <InputField
              id="project_name"
              name="project_name"
              type="text"
              label={t("form.titol")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.project_name || ""}
              slimLine={true}
              valid={true}
            />
            {!!formik.errors.project_name && (
              <LogFormError>
                <div>{formik.errors.project_name}</div>
              </LogFormError>
            )}
          </div>
          <div className={description === null ? "" : "field-wrapper"}>
            <TextArea
              id="description"
              name="description"
              initText={initialProjectData.description || ""}
              setText={setDescription}
              label={t("modal.descripcio")}
            />
            {description === null && (
              <LogFormError>
                <div>{ERROR.GENERIC.REQUIRED}</div>
              </LogFormError>
            )}
          </div>
          <div className="field-wrapper">
            <MediaLinksForm
              label="link"
              mediaLinks={mediaLinks}
              setMediaLinks={setMediaLinks}
            />
          </div>
          <div className="field-wrapper">
            <ImageLoader maxNumber={6} images={images} setImages={setImages} />
            {images === null && (
              <LogFormError>
                <div>{ERROR.GENERIC.REQUIRED}</div>
              </LogFormError>
            )}
          </div>
          <div className="field-wrapper">
            <CheckBox
              label={isPublic ? "Publicat" : "No publicat"}
              checked={isPublic}
              onChange={(e) => setIsPublic(!e)}
            />
          </div>
          <div className="button-box">
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
          </div>
        </form>
      </MemberFormBox>
    </MemberProjectFrame>
  );
};

export default MemberProject;
