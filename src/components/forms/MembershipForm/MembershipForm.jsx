import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMemberProfile,
  updateMemberProfile,
} from "../../../store/actions/auth";
import { deepComparision, isEmptyObject } from "../../../utils/utils";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { LogFormBox, LogFormError } from "../Log.style";
import { validate } from "../MembershipForm/MembershipValidate";
import { useTranslation } from "react-i18next";

export default function MembershipForm({ handleNext, setButtonDisabled }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user_member_data = {} } = auth;
  const initialMemberValues = {
    username: user_member_data.username,
    first_name: user_member_data.first_name,
    last_name: user_member_data.last_name,
    identity_card: user_member_data.identity_card,
    phone_number: user_member_data.phone_number,
  };
  const [t] = useTranslation("translation");
  const isNewMember = deepComparision(user_member_data, {});

  const InitialValues = {
    username: user_member_data.username || "",
    first_name: initialMemberValues.first_name || "",
    last_name: initialMemberValues.last_name || "",
    identity_card: initialMemberValues.identity_card || "",
    phone_number: initialMemberValues.phone_number || "",
  };

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    setButtonDisabled &&
      setButtonDisabled(isNewMember || dataHasChanged || !formik.isValid);
  }, [dataHasChanged, isNewMember, formik.isValid, setButtonDisabled]);

  const handleCancel = (setValues) => {
    setValues(InitialValues);
    if (!isNewMember) formik.setErrors({});
    setDataHasChanged(false);
  };

  const handleBlur = (values) => {
    const dataHasChanged = !deepComparision(initialMemberValues, values);
    setDataHasChanged(dataHasChanged);
  };

  const handleSubmit = (values) => {
    const {
      first_name,
      last_name,
      identity_card,
      phone_number,
      username = "",
    } = values;
    setLoading(true);
    if (!isNewMember) {
      dispatch(
        updateMemberProfile(
          identity_card,
          first_name,
          last_name,
          phone_number,
          username
        )
      )
        .then(() => {
          setLoading(false);
          setButtonDisabled && setButtonDisabled(false);
          setDataHasChanged(false);
          handleNext && handleNext();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      dispatch(
        createMemberProfile(
          identity_card,
          first_name,
          last_name,
          phone_number,
          username
        )
      )
        .then(() => {
          setLoading(false);
          setButtonDisabled && setButtonDisabled(false);
          setDataHasChanged(false);
          handleNext();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <LogFormBox>
      <form onSubmit={formik.handleSubmit}>
        {!isNewMember && (
          <div className="field-wrapper">
            <InputField
              id="memberNum"
              name="memberNum"
              type="text"
              label={t("form.soci")}
              value={user_member_data?.number}
              slimLine={true}
              valid={true}
              disabled={true}
            />
          </div>
        )}
        <div className="field-wrapper">
          <InputField
            id="username"
            name="username"
            type="text"
            label={t("form.usuari")}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            slimLine={true}
            value={formik.values.username}
            valid={!formik.errors.username}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="first_name"
            name="first_name"
            type="text"
            label={t("form.nom")}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            slimLine={true}
            value={formik.values.first_name}
            valid={!formik.errors.first_name}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="last_name"
            name="last_name"
            type="text"
            label={t("form.cognom")}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            slimLine={true}
            value={formik.values.last_name}
            valid={!formik.errors.last_name}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="identity_card"
            name="identity_card"
            type="text"
            label="DNI/NIE"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            slimLine={true}
            value={formik.values.identity_card}
            valid={!formik.errors.identity_card}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="phone_number"
            name="phone_number"
            type="text"
            label={t("form.telefon")}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            slimLine={true}
            value={formik.values.phone_number}
            valid={!formik.errors.phone_number}
          />
        </div>
        <div>
          {!isEmptyObject(formik.errors) && (
            <LogFormError>
              {Object.values(formik.errors).map((x) => {
                return <div key={x}>{x}</div>;
              })}
            </LogFormError>
          )}
        </div>
        {dataHasChanged && (
          <div className="row button-row">
            <div className="column">
              <Button
                variant="contained"
                className="submit"
                color="primary"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
                onClick={() => handleCancel(formik.setValues)}
              >
                {t("boto.cancela")}
              </Button>
            </div>
            <div className="column">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
              >
                {loading ? (
                  <span className="spinner-border"></span>
                ) : (
                  <>{t("boto.guarda")}</>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </LogFormBox>
  );
}
