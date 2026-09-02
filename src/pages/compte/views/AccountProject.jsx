import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import authService from "../../../store/services/auth.service";
import TextArea from "../../../components/forms/TextArea/TextArea";
import EmbeddedSpinner from "../../../components/spinner/EmbeddedSpinner";
import { validate } from "./AccountProjectValidate";
import { iframesValidation, urlValidation } from "../../../utils/validations";
import { sanitizeHTML, sanitizeEmbed } from "../../../utils/sanitize";
import { ERROR } from "../../../utils/constants";
import notificationToast from "../../../utils/utils";
import "./AccountProject.css";

const CURATED_TAGS = [
  "DJ",
  "Productor",
  "Live",
  "Segell",
  "Col·lectiu",
  "VJ",
  "Visuals",
];

function AccountProject({ isMembershipExpired }) {
  const [t] = useTranslation("translation");
  const [initialProjectData, setInitialProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaLinks, setMediaLinks] = useState([]);
  const [images, setImages] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setLoading(true);
    authService
      .getMemberProject()
      .then((data) => {
        setInitialProjectData(data);
        setProjectName(data.project_name || "");
        setDescription(data.description || "");
        setTags(data.tags || []);
        setMediaLinks(data.media_urls || []);
        setImages(data.images || []);
        setIsPublic(data.public || false);
      })
      .catch(() => setMessage(t("errors.general")))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDirty = useMemo(() => {
    const nameChanged = (initialProjectData.project_name || "") !== projectName;
    const descChanged = (initialProjectData.description || "") !== description;
    const tagsChanged =
      JSON.stringify(initialProjectData.tags || []) !== JSON.stringify(tags);
    const linksChanged =
      JSON.stringify(initialProjectData.media_urls || []) !==
      JSON.stringify(mediaLinks);
    const imagesChanged =
      JSON.stringify((initialProjectData.images || []).map((i) => i.image)) !==
      JSON.stringify((images || []).map((i) => i.image));
    const publicChanged = (initialProjectData.public || false) !== isPublic;
    return (
      nameChanged || descChanged || tagsChanged || linksChanged || imagesChanged || publicChanged
    );
  }, [initialProjectData, projectName, description, tags, mediaLinks, images, isPublic]);

  const toggleTag = (label) => {
    setTags((prev) =>
      prev.includes(label) ? prev.filter((tag) => tag !== label) : [...prev, label],
    );
  };

  const handleLinkChange = (index, value) => {
    setMediaLinks((prev) => prev.map((link, i) => (i === index ? value : link)));
  };

  const handleLinkRemove = (index) => {
    setMediaLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const addLink = () => setMediaLinks((prev) => [...prev, ""]);

  const linkError = (link) =>
    link.length > 0 && !iframesValidation(link) && !urlValidation(link);

  const handleDiscard = () => {
    setProjectName(initialProjectData.project_name || "");
    setDescription(initialProjectData.description || "");
    setTags(initialProjectData.tags || []);
    setMediaLinks(initialProjectData.media_urls || []);
    setImages(initialProjectData.images || []);
    setIsPublic(initialProjectData.public || false);
    setSubmitAttempted(false);
    setMessage("");
  };

  const plainDescription = description.replace(/<[^>]+>/g, "").trim();
  const projectNameError = submitAttempted ? validate({ project_name: projectName }).project_name : "";
  const descriptionError = submitAttempted && !plainDescription ? ERROR.GENERIC.REQUIRED : "";
  const imagesError = submitAttempted && images.length === 0 ? ERROR.GENERIC.REQUIRED : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const fieldErrors = validate({ project_name: projectName });
    const hasImages = images.length > 0;
    const hasDescription = plainDescription.length > 0;
    const linksInvalid = mediaLinks.some(linkError);

    if (fieldErrors.project_name || !hasImages || !hasDescription || linksInvalid) {
      setMessage(linksInvalid ? t("compte.enllac-invalid") : "");
      return;
    }

    setSaving(true);
    authService
      .updateMemberProject({
        project_name: projectName,
        description,
        tags,
        upload_media_urls: mediaLinks.filter((link) => link.length > 0),
        upload_images: images.map((img) => img.image),
        public: isPublic,
      })
      .then((data) => {
        notificationToast(t("general.agraiment"), "success");
        setInitialProjectData(data);
        setMediaLinks(data.media_urls || []);
        setSubmitAttempted(false);
        setMessage("");
      })
      .catch(() => {
        notificationToast(t("errors.general"), "error");
        setMessage(t("errors.general"));
      })
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 40 }}>
        <EmbeddedSpinner alone />
      </div>
    );
  }

  const previewTitle = projectName.trim() || t("compte.sense-titol");
  const previewLinks = mediaLinks.filter((link) => link.length > 0 && !iframesValidation(link));
  const previewEmbeds = mediaLinks
    .filter((link) => iframesValidation(link))
    .map((link) => sanitizeEmbed(link))
    .filter(Boolean);

  return (
    <section style={{ paddingTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="account-project__banner">
        <p>
          {t("info.project")}
          {isMembershipExpired && ` — ${t("soci.no-soci-perfil")}`}
        </p>
        <span
          className="account-project__state"
          style={{
            background: isPublic ? "var(--color-naranja)" : "rgba(242,227,201,.2)",
            color: isPublic ? "var(--color-negro)" : "var(--color-cream)",
          }}
        >
          {isPublic ? t("compte.publicat-al-directori") : t("compte.esborrany")}
        </span>
      </div>

      <div className="compte-grid" style={{ display: "grid", gridTemplateColumns: "1.02fr .98fr", gap: 24, alignItems: "start" }}>
        <form onSubmit={handleSubmit} className="compte-panel">
          <h2 className="compte-panel__title">{t("compte.edita-projecte")}</h2>

          <label className="compte-field">
            <span className="compte-label">{t("form.titol")}</span>
            <input
              className="compte-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={t("compte.nom-artistic")}
            />
            {projectNameError && <span className="compte-field-error">{projectNameError}</span>}
          </label>

          <label className="compte-field">
            <span className="compte-label">{t("compte.rols")}</span>
            <div className="account-project__tags">
              {CURATED_TAGS.map((label) => {
                const pressed = tags.includes(label);
                return (
                  <button
                    type="button"
                    key={label}
                    className="compte-tool"
                    aria-pressed={pressed}
                    onClick={() => toggleTag(label)}
                    style={{
                      background: pressed ? "var(--color-negro)" : "var(--color-cream)",
                      color: pressed ? "var(--color-cream)" : "var(--color-negro)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </label>

          <div className="compte-field">
            <span className="compte-label">{t("modal.descripcio")}</span>
            <TextArea
              initText={initialProjectData.description}
              setText={setDescription}
              label=""
            />
            <span className="account-project__hint">
              {plainDescription.length} {t("compte.caracters")}
            </span>
            {descriptionError && <span className="compte-field-error">{descriptionError}</span>}
          </div>

          <div className="compte-field">
            <span className="compte-label">{t("compte.enllacos")}</span>
            {mediaLinks.map((link, i) => (
              <div key={i} className="account-project__link-row">
                <input
                  className="compte-input"
                  value={link}
                  onChange={(e) => handleLinkChange(i, e.target.value)}
                  placeholder={t("compte.enllac-placeholder")}
                />
                <button
                  type="button"
                  className="compte-tool"
                  aria-label={t("compte.elimina-enllac")}
                  onClick={() => handleLinkRemove(i)}
                >
                  ×
                </button>
              </div>
            ))}
            {mediaLinks.some(linkError) && (
              <span className="compte-field-error">{t("compte.enllac-invalid")}</span>
            )}
            <button type="button" className="compte-ghost account-project__add-link" onClick={addLink}>
              + {t("compte.afegeix-enllac")}
            </button>
          </div>

          <div className="compte-field">
            <span className="compte-label">{t("form.imatges")}</span>
            <ImageUploading
              multiple
              value={images}
              onChange={setImages}
              maxNumber={6}
              dataURLKey="image"
              acceptType={["jpg", "jpeg", "gif", "png"]}
            >
              {({ imageList, onImageUpload, onImageRemove, onImageUpdate, dragProps }) => (
                <div className="account-project__images">
                  {imageList.map((image, index) => (
                    <div key={index} className="account-project__image-slot">
                      <img src={image.image} alt="" />
                      <div className="account-project__image-actions">
                        <button type="button" className="compte-tool" onClick={() => onImageUpdate(index)}>
                          {t("compte.substitueix")}
                        </button>
                        <button type="button" className="compte-tool" onClick={() => onImageRemove(index)}>
                          {t("compte.elimina")}
                        </button>
                      </div>
                    </div>
                  ))}
                  {imageList.length < 6 && (
                    <button
                      type="button"
                      className="account-project__image-add"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      + {t("form.carrega-imatges")}
                    </button>
                  )}
                </div>
              )}
            </ImageUploading>
            <span className="account-project__hint">{t("compte.imatges-hint")}</span>
            {imagesError && <span className="compte-field-error">{imagesError}</span>}
          </div>

          <label className="compte-field" style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              style={{ width: 22, height: 22, accentColor: "var(--color-rojo)", flex: "none" }}
            />
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{t("form.publicat")}</span>
          </label>

          <div className="compte-panel__actions">
            <button type="button" className="compte-ghost" onClick={handleDiscard} disabled={!isDirty || saving}>
              {t("boto.cancela")}
            </button>
            <button type="submit" className="compte-badge" disabled={saving}>
              {t("boto.guarda")}
            </button>
          </div>
          <div className="compte-panel__message" aria-live="polite">
            {message}
          </div>
        </form>

        <div className="account-project__preview">
          <div className="account-project__preview-head">
            <span className="account-project__preview-label">{t("compte.previsualitzacio")}</span>
            {initialProjectData.public && (
              <a href="/associacio/socis">{t("compte.obre-directori")}</a>
            )}
          </div>
          <div className="account-project__preview-card">
            <div className="account-project__preview-cream">
              <h3>{previewTitle}</h3>
              <div className="account-project__preview-tags">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="account-project__preview-negro">
              {plainDescription ? (
                <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
              ) : (
                <p className="account-project__preview-empty">{t("compte.sense-descripcio")}</p>
              )}
              {images.length > 0 && (
                <div className="account-project__preview-images">
                  {images.slice(0, 2).map((img, i) => (
                    <img key={i} src={img.image} alt="" />
                  ))}
                </div>
              )}
              {previewEmbeds.length > 0 && (
                <div className="account-project__preview-embeds">
                  {previewEmbeds.map((embed, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: embed }} />
                  ))}
                </div>
              )}
              {previewLinks.length > 0 && (
                <div className="account-project__preview-links">
                  {previewLinks.map((link, i) => (
                    <span key={i}>{link}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="account-project__preview-note">{t("compte.previsualitzacio-nota")}</p>
        </div>
      </div>
    </section>
  );
}

export default AccountProject;
