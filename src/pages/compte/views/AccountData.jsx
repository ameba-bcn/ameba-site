import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axios";
import { API_URL, ERROR } from "../../../utils/constants";
import { usernameValidation } from "../../../utils/validations";
import { validate as validateMembership } from "../../../components/forms/MembershipForm/MembershipValidate";
import useAuthStore, { defaultMemberData } from "../../../stores/useAuthStore";
import { deepComparision, isEmptyObject } from "../../../utils/utils";
import MemberQr from "./components/MemberQr";
import "./AccountData.css";

function AccountData({ isMember, isMembershipExpired }) {
  const [t] = useTranslation("translation");
  const { user_data = {}, user_member_data = {} } = useAuthStore();
  const updateMemberProfile = useAuthStore((state) => state.updateMemberProfile);
  const createMemberProfile = useAuthStore((state) => state.createMemberProfile);
  const getUserData = useAuthStore((state) => state.getUserData);

  const canEditMemberFields = isMember && !isMembershipExpired;
  const isNewMember = canEditMemberFields
    ? deepComparision(user_member_data, defaultMemberData)
    : false;

  // Full member form: username, name, surname, DNI, phone.
  const initialValues = {
    username: user_member_data.username || "",
    first_name: user_member_data.first_name || "",
    last_name: user_member_data.last_name || "",
    identity_card: user_member_data.identity_card || "",
    phone_number: user_member_data.phone_number || "",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_member_data.username, user_member_data.first_name, user_member_data.last_name, user_member_data.identity_card, user_member_data.phone_number]);

  const isDirty = !deepComparision(initialValues, values);

  const handleField = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleDiscard = () => {
    setValues(initialValues);
    setErrors({});
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateMembership(values);
    setErrors(fieldErrors);
    if (!isEmptyObject(fieldErrors)) return;

    setSaving(true);
    const { identity_card, first_name, last_name, phone_number, username } = values;
    const request = isNewMember
      ? createMemberProfile(identity_card, first_name, last_name, phone_number)
      : updateMemberProfile(identity_card, first_name, last_name, phone_number, username);

    request
      .then(() => setMessage(""))
      .catch(() => setMessage(t("errors.general")))
      .finally(() => setSaving(false));
  };

  // Simple username-only form for non-members / expired members.
  const [simpleUsername, setSimpleUsername] = useState(user_data.username || "");
  const [savingUsername, setSavingUsername] = useState(false);

  useEffect(() => {
    setSimpleUsername(user_data.username || "");
  }, [user_data.username]);

  const simpleUsernameError = simpleUsername.length === 0 || usernameValidation(simpleUsername);
  const simpleUsernameDirty = simpleUsername !== (user_data.username || "");

  const handleSaveUsername = () => {
    if (simpleUsernameError || !simpleUsernameDirty) return;
    setSavingUsername(true);
    axiosInstance
      .patch(`${API_URL}users/current/`, { username: simpleUsername })
      .then(() => getUserData())
      .catch(() => setSimpleUsername(user_data.username || ""))
      .finally(() => setSavingUsername(false));
  };

  return (
    <section className="compte-grid" style={{ display: "grid", gridTemplateColumns: canEditMemberFields ? "1.25fr .75fr" : "1fr", gap: 24, alignItems: "start", paddingTop: 28 }}>
      {canEditMemberFields ? (
        <form onSubmit={handleSubmit} className="compte-panel">
          <div className="compte-panel__head">
            <h2 className="compte-panel__title">{t("compte.dades-personals")}</h2>
            <span className="compte-panel__hint">
              {isDirty ? t("compte.canvis-pendents") : t("compte.tot-guardat")}
            </span>
          </div>

          <div className="compte-pair" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label className="compte-field">
              <span className="compte-label">{t("compte.numero-soci")}</span>
              <input className="compte-input" value={user_member_data.number ?? ""} readOnly />
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("form.usuari")}</span>
              <input
                className="compte-input"
                name="username"
                value={values.username}
                onChange={handleField}
              />
              {errors.username && <span className="compte-field-error">{errors.username}</span>}
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("form.nom")}</span>
              <input
                className="compte-input"
                name="first_name"
                value={values.first_name}
                onChange={handleField}
              />
              {errors.first_name && <span className="compte-field-error">{errors.first_name}</span>}
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("form.cognom")}</span>
              <input
                className="compte-input"
                name="last_name"
                value={values.last_name}
                onChange={handleField}
              />
              {errors.last_name && <span className="compte-field-error">{errors.last_name}</span>}
            </label>
            <label className="compte-field">
              <span className="compte-label">DNI / NIE</span>
              <input
                className="compte-input"
                name="identity_card"
                value={values.identity_card}
                onChange={handleField}
              />
              {errors.identity_card && <span className="compte-field-error">{errors.identity_card}</span>}
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("form.telefon")}</span>
              <input
                className="compte-input"
                name="phone_number"
                value={values.phone_number}
                onChange={handleField}
              />
              {errors.phone_number && <span className="compte-field-error">{errors.phone_number}</span>}
            </label>
            <label className="compte-field">
              <span className="compte-label">Email</span>
              <input className="compte-input" value={user_data.email || ""} readOnly />
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("compte.contrasenya")}</span>
              <input className="compte-input" value="••••••••" readOnly />
            </label>
          </div>

          <div className="compte-panel__actions">
            <Link to="/recupera-contrasenya" className="account-data__password-link">
              {t("compte.canvia-contrasenya")}
            </Link>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="compte-ghost" onClick={handleDiscard} disabled={!isDirty || saving}>
                {t("boto.cancela")}
              </button>
              <button type="submit" className="compte-badge" disabled={!isDirty || saving}>
                {t("boto.guarda")}
              </button>
            </div>
          </div>
          <div className="compte-panel__message" aria-live="polite">{message}</div>
        </form>
      ) : (
        <div className="compte-panel">
          {isMember && isMembershipExpired && (
            <p className="account-data__notice">{t("soci.no-soci-perfil")}</p>
          )}
          <div className="compte-panel__head">
            <h2 className="compte-panel__title">{t("compte.dades-personals")}</h2>
          </div>
          <div className="compte-pair" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label className="compte-field">
              <span className="compte-label">{t("form.usuari")}</span>
              <input
                className="compte-input"
                value={simpleUsername}
                onChange={(e) => setSimpleUsername(e.target.value)}
              />
              {simpleUsernameError && simpleUsername.length > 0 && (
                <span className="compte-field-error">{ERROR.USERNAME.FORMAT}</span>
              )}
            </label>
            <label className="compte-field">
              <span className="compte-label">{t("form.soci")}</span>
              <input className="compte-input" value={user_data.number || user_member_data.number || "-"} readOnly />
            </label>
            <label className="compte-field">
              <span className="compte-label">Email</span>
              <input className="compte-input" value={user_data.email || ""} readOnly />
            </label>
          </div>
          <div className="compte-panel__actions">
            {!isMember && (
              <span className="account-data__cta">
                {t("perfil.vols-soci")}?{" "}
                <Link to="/associacio/nou-soci">{t("perfil.mes-info")}</Link>
              </span>
            )}
            <button
              type="button"
              className="compte-badge"
              onClick={handleSaveUsername}
              disabled={simpleUsernameError || !simpleUsernameDirty || savingUsername}
            >
              {t("boto.guarda")}
            </button>
          </div>
        </div>
      )}

      {canEditMemberFields && (
        <div className="account-data__aside">
          <MemberQr />
          <div className="account-data__quota">
            <span className="account-data__quota-title">{t("compte.quota-baixa-titol")}</span>
            <p className="account-data__quota-text">
              {t("perfil.baixa-missatge")}{" "}
              <a href="mailto:info@ameba.cat">info@ameba.cat</a>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountData;
