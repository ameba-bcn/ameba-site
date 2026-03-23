import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import useAuthStore from "../../../stores/useAuthStore";
import InputField from "../../../components/forms/InputField/InputField";
import "../../../components/forms/Log.style.css";
import "./MemberProject.style.css";
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
import notificationToast, { isDateExpired } from "../../../utils/utils";
import PreviewerSociosDetailed from "../../socios/components/PreviewerSociosDetailed";
import ToogleButton from "../../../components/button/ToogleButton";
import EmbeddedSpinner from "../../../components/spinner/EmbeddedSpinner";

const MemberProject = () => {
  const [initialProjectData, setInitialProjectData] = useState({});
  const [t] = useTranslation("translation");
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState("");
  const [mediaLinks, setMediaLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user_member_data } = useAuthStore();
  const { status = "", expires = "" } = user_member_data || {};
  const isMembershipExpired = isDateExpired(expires);

  useEffect(() => {
    setLoading(true);
    authService
      .getMemberProject()
      .then((data) => {
        setInitialProjectData(data);
        setIsPublic(data.public);
        setImages(data.images || []);
        setDescription(data.description);
        setMediaLinks(data.media_urls || []);
        // Auto-switch to edit mode if project has no content
        const hasContent =
          data.project_name ||
          data.description ||
          (data.images && data.images.length > 0);
        if (!hasContent) {
          setEditMode(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (val) => {
    const hasImages = images && images.length > 0;
    const hasDescription = description && description.length > 0;

    if (!hasImages) {
      setImages(null);
    }
    if (!hasDescription) {
      setDescription(null);
    }
    if (!hasImages || !hasDescription) {
      return;
    }

    setLoading(true);
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
        notificationToast(t("general.agraiment"), "success");
        setEditMode(false);
        setInitialProjectData((prev) => ({
          ...prev,
          ...val,
          description,
          media_urls: mediaLinks,
          images,
          public: isPublic,
        }));
      })
      .catch(() => {
        notificationToast(t("errors.general"), "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      project_name: initialProjectData?.project_name || "",
    },
    enableReinitialize: true,
    validate,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const disabled = useMemo(() => {
    const descriptionUnchanged =
      (initialProjectData?.description || "").trim() ===
      (description || "").trim();
    const nameUnchanged =
      (initialProjectData?.project_name || "").trim() ===
      (formik.values?.project_name || "").trim();
    const mediaUnchanged =
      JSON.stringify(initialProjectData?.media_urls || []) ===
      JSON.stringify(mediaLinks || []);
    const imagesUnchanged =
      JSON.stringify((initialProjectData?.images || []).map((i) => i.image)) ===
      JSON.stringify((images || []).map((i) => i.image));
    const publicUnchanged =
      (initialProjectData?.public || false) === (isPublic || false);

    return (
      descriptionUnchanged &&
      nameUnchanged &&
      mediaUnchanged &&
      imagesUnchanged &&
      publicUnchanged
    );
  }, [
    initialProjectData,
    description,
    formik.values?.project_name,
    mediaLinks,
    images,
    isPublic,
  ]);

  return (
    <div className="member-project-frame">
      <div className="member-form-box">
        <form className="formMembership" onSubmit={formik.handleSubmit}>
          {isMembershipExpired ? (
            <DisclaimerBox
              text={t("soci.no-soci-perfil")}
              id="project-disclaimer"
              closable
            />
          ) : (
            <>
              <DisclaimerBox
                text={t("info.project")}
                id="project-disclaimer-info"
                closable
                style="light"
              />
            </>
          )}
          {!isMembershipExpired && (
            <ToogleButton
              text1={t("boto.edit")}
              text2={t("boto.preview")}
              firstActive={editMode}
              setFirstActive={setEditMode}
              id="project-toogle-button"
            />
          )}
          {loading ? (
            <EmbeddedSpinner alone />
          ) : editMode && !isMembershipExpired ? (
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
                  <div className="log-form-error">
                    <div>{formik.errors.project_name}</div>
                  </div>
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
                  <div className="log-form-error">
                    <div>{ERROR.GENERIC.REQUIRED}</div>
                  </div>
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
                  <div className="log-form-error">
                    <div>{ERROR.GENERIC.REQUIRED}</div>
                  </div>
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
                  loading={loading}
                >
                  <>{t("boto.guarda")}</>
                </Button>
              </div>
            </>
          ) : (
            <div className="preview-frame">
              <div className="preview-frame__label">{t("boto.preview")}</div>
              <PreviewerSociosDetailed
                project_name={initialProjectData.project_name}
                description={initialProjectData.description}
                images={initialProjectData.images}
                media_urls={initialProjectData?.media_urls}
                first_name={initialProjectData.username}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MemberProject;
