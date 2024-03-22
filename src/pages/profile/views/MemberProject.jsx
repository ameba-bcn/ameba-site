import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import InputField from "../../../components/forms/InputField/InputField";
import { LogFormError } from "../../../components/forms/Log.style";
import { MemberFormBox, MemberProjectFrame } from "./MemberProject.style";
import Button from "../../../components/button/Button";
import TextArea from "../../../components/forms/TextArea/TextArea";
import authService from "../../../store/services/auth.service";
import { useTranslation } from "react-i18next";
import ImageLoader from "../../../components/image-loader/ImageLoader";
import MediaLinksForm from "./components/MediaLinksForm";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
// import { setUploadedImages } from "../../../store/actions/profile";
import { validate } from "./MemberProjectValidate";
import { ERROR } from "../../../utils/constants";
import CheckBox from "../../../components/layout/CheckBox";

const MemberProject = () => {
  const [initialProjectData, setInitialProjectData] = useState({});
  const [images, setImages] = useState(initialProjectData.images || []);
  const [isPublic, setIsPublic] = useState(initialProjectData.public || false);
  const [description, setDescription] = useState(
    initialProjectData.description || ""
  );
  // const [storedImages, setStoredImages] = useState([]);
  const [mediaLinks, setMediaLinks] = useState(
    initialProjectData.media_urls || []
  );
  const isActive = initialProjectData.isActive;
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [t] = useTranslation("translation");

  useEffect(() => {
    authService
      .getMemberProject()
      .then((data) => {
        setLoading(false);
        setInitialProjectData(data);
        setIsPublic(data.public);
        setImages(data.images || []);
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
      const upload_images = images.map((img) => img.image);
      authService.updateMemberProject({
        ...val,
        description: description,
        media_urls: mediaLinks,
        upload_images,
        public: isPublic || false,
      });
    }
  };

  // const uploadImage = () => {
  //   images.map((img) => {
  //     authService.uploadImage(img).then((data) => {
  //       const { image } = data;
  //       // setStoredImages(storedImages.push(image));
  //       dispatch(setUploadedImages(String(image)));
  //     });
  //   });
  // };

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

  const isReadOnly = false;

  return (
    <MemberProjectFrame>
      <MemberFormBox>
        <form className="formMembership" onSubmit={formik.handleSubmit}>
          <DisclaimerBox
            text={isActive ? t("soci.perfil-gral") : t("soci.no-soci-perfil")}
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
              disabled={isReadOnly}
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
              disabled={isReadOnly}
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
              disabled={isReadOnly}
            />
          </div>
          <div className="field-wrapper">
            <ImageLoader
              maxNumber={6}
              images={images}
              setImages={setImages}
              disabled={isReadOnly}
            />
            {images === null && (
              <LogFormError>
                <div>{ERROR.GENERIC.REQUIRED}</div>
              </LogFormError>
            )}
          </div>
          <div className="field-wrapper">
            <CheckBox
              label={isPublic ? t("form.publicat") : t("form.no-publicat")}
              checked={isPublic}
              onChange={(e) => setIsPublic(!e)}
              disabled={isReadOnly}
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
              {loading ? (
                <span className="spinner-border"></span>
              ) : (
                <>{t("boto.guarda")}</>
              )}
            </Button>
          </div>
        </form>
      </MemberFormBox>
    </MemberProjectFrame>
  );
};

export default MemberProject;
