import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { validate } from "./MemberProjectValidate";
import { ACTIVE_STATUS, ERROR } from "../../../utils/constants";
import CheckBox from "../../../components/layout/CheckBox";
import Spinner from "../../../components/spinner/Spinner";
import notificationToast from "../../../utils/utils";
import PreviewerSociosDetailed from "../../socios/components/PreviewerSociosDetailed";
import ToogleButton from "../../../components/button/ToogleButton";

const MemberProject = () => {
  const [initialProjectData, setInitialProjectData] = useState({});
  const [t] = useTranslation("translation");
  const [editMode, setEditMode] = useState(false);
  let disabled = false;
  const [images, setImages] = useState(initialProjectData.images || []);
  const [isPublic, setIsPublic] = useState(initialProjectData.public || false);
  const [description, setDescription] = useState(
    initialProjectData.description || ""
  );
  const [mediaLinks, setMediaLinks] = useState(
    initialProjectData.media_urls || []
  );
  const isProfileActive = initialProjectData.isActive;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService
      .getMemberProject()
      .then((data) => {
        setInitialProjectData(data);
        setIsPublic(data.public);
        setImages(data.images || []);
        setDescription(data.description);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [editMode]);

  const handleSubmit = (val) => {
    setLoading(true);
    if (images?.length === 0) setImages(null);
    if (description?.length === 0 || description === null) {
      setDescription(null);
    }
    if (
      !(images?.length === 0 || images === null) &&
      !(description?.length === 0 || description === null)
    ) {
      const upload_images = images.map((img) => img.image);

      authService
        .updateMemberProject({
          ...val,
          description: description,
          upload_media_urls: mediaLinks,
          upload_images: upload_images,
          public: isPublic || false,
        })
        .then(() => {
          setLoading(false);
          notificationToast(t("general.agraiment"), "success");
          setEditMode(false);
        })
        .catch(() => {
          setLoading(false);
          notificationToast(t("errors.general"), "error");
        });
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      ...initialProjectData,
      images: initialProjectData?.images,
      links: initialProjectData?.media_urls,
    },
    enableReinitialize: true,
    validate,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (
    initialProjectData?.description?.trim() === description?.trim() &&
    initialProjectData?.project_name?.trim() === formik.values?.project_name &&
    (initialProjectData?.media_urls?.length > 0 &&
      initialProjectData?.media_urls[0]) ===
      (mediaLinks?.length > 0 && mediaLinks[0]) &&
    initialProjectData?.images == images &&
    initialProjectData?.public === isPublic
  ) {
    disabled = true;
  } else {
    disabled = false;
  }

  const { user_member_data = {} } = useSelector((state) => state.auth);
  const { status = "" } = user_member_data;

  return (
    <MemberProjectFrame>
      <MemberFormBox>
        <form className="formMembership" onSubmit={formik.handleSubmit}>
          {status !== ACTIVE_STATUS && (
            <DisclaimerBox
              text={
                isProfileActive
                  ? t("soci.perfil-gral")
                  : t("soci.no-soci-perfil")
              }
              id="project-disclaimer"
              borderColor="black"
            />
          )}
          <DisclaimerBox
            text={t("info.project")}
            id="project-disclaimer"
            borderColor="black"
            bgColor={`var(--color-cream)`}
          />
          <ToogleButton
            text1={t("boto.edit")}
            text2={t("boto.preview")}
            firstActive={editMode}
            setFirstActive={setEditMode}
            id="project-toogle-button"
          />
          {loading ? (
            <Spinner color="black" height={400} />
          ) : editMode ? (
            <>
              <div className="field-wrapper">
                <InputField
                  id="project_name"
                  name="project_name"
                  type="text"
                  label={t("form.titol")}
                  tooltip={t("events.tooltip.title")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.project_name || ""}
                  slimLine={true}
                  valid={!formik.errors.project_name}
                  disabled={false}
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
                  initText={initialProjectData.description}
                  setText={setDescription}
                  label={t("modal.descripcio")}
                  disabled={false}
                  tooltip={t("events.tooltip.description")}
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
                  disabled={false}
                  tooltip={t("events.tooltip.link")}
                />
              </div>
              <div className="field-wrapper">
                <ImageLoader
                  maxNumber={6}
                  images={images}
                  setImages={setImages}
                  disabled={false}
                  tooltip={t("events.tooltip.images")}
                />
                {images === null && (
                  <LogFormError>
                    <div>{ERROR.GENERIC.REQUIRED}</div>
                  </LogFormError>
                )}
              </div>
              <div className="field-wrapper">
                <CheckBox
                  label={t("form.publicat")}
                  checked={isPublic}
                  onChange={(e) => setIsPublic(!e)}
                  disabled={false}
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
                  disabled={loading || disabled}
                >
                  {loading ? (
                    <span className="spinner-border"></span>
                  ) : (
                    <>{t("boto.guarda")}</>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <PreviewerSociosDetailed
                project_name={initialProjectData.project_name}
                description={initialProjectData.description}
                images={initialProjectData.images}
                media_urls={initialProjectData?.media_urls}
                first_name={initialProjectData.username}
              />
            </>
          )}
        </form>
      </MemberFormBox>
    </MemberProjectFrame>
  );
};

export default MemberProject;
