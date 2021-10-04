import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createMemberProfile,
  updateMemberProfile,
} from "../../../redux/actions/auth";
import { useSelector } from "react-redux";
import { deepComparision } from "../../../utils/utils";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { LogFormBox, LogFormError } from "../Log.style";
import { validate } from "../MembershipForm/MembershipValidate";

export default function MembershipForm({
  setDisplayError,
  handleNext,
  setSuccessful,
  setButtonDisabled,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user_member_data = {} } = auth;
  const initialMemberValues = {
    first_name: user_member_data.first_name,
    last_name: user_member_data.last_name,
    address: user_member_data.address,
    phone_number: user_member_data.phone_number,
  };
  const isNewMember = deepComparision(user_member_data, {});

  const InitialValues = {
    first_name: initialMemberValues.first_name || "",
    last_name: initialMemberValues.last_name || "",
    address: initialMemberValues.address || "",
    phone_number: initialMemberValues.phone_number || "",
  };

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    setButtonDisabled &&
      setButtonDisabled(isNewMember || dataHasChanged || !formik.isValid);
  }, [dataHasChanged, isNewMember]);

  const handleCancel = (setValues) => {
    setValues(initialMemberValues);
    setDataHasChanged(false);
  };

  const handleBlur = (values) => {
    const dataHasChanged = !deepComparision(initialMemberValues, values);
    setDataHasChanged(dataHasChanged);
  };

  const handleSubmit = (values) => {
    const { first_name, last_name, address, phone_number } = values;
    setLoading(true);
    if (!isNewMember) {
      dispatch(
        updateMemberProfile(address, first_name, last_name, phone_number)
      )
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          setButtonDisabled && setButtonDisabled(false);
          setDataHasChanged(false);
          setDisplayError(false);
          handleNext && handleNext();
        })
        .catch(() => {
          setDisplayError(true);
          setLoading(false);
        });
    } else {
      dispatch(
        createMemberProfile(address, first_name, last_name, phone_number)
      )
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          setButtonDisabled && setButtonDisabled(false);
          setDataHasChanged(false);
          setDisplayError(false);
          handleNext();
        })
        .catch(() => {
          setDisplayError(true);
          setLoading(false);
        });
    }
  };

  return (
    <LogFormBox>
      <form onSubmit={formik.handleSubmit}>
        {!isNewMember && (
          <div>
            <InputField
              id="memberNum"
              name="memberNum"
              type="text"
              label="Nºsoci"
              value={user_member_data?.number}
              valid={true}
              disabled={true}
            />
          </div>
        )}
        <div>
          <InputField
            id="first_name"
            name="first_name"
            type="text"
            label="nom"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            value={formik.values.first_name}
            valid={true}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <LogFormError>{formik.errors.first_name}</LogFormError>
          ) : null}
        </div>
        <div>
          <InputField
            id="last_name"
            name="last_name"
            type="text"
            label="cognoms"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            value={formik.values.last_name}
            valid={true}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <LogFormError>{formik.errors.last_name}</LogFormError>
          ) : null}
        </div>
        <div>
          <InputField
            id="address"
            name="address"
            type="text"
            label="Adreça"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            value={formik.values.address}
            valid={true}
          />
          {formik.touched.address && formik.errors.address ? (
            <LogFormError>{formik.errors.address}</LogFormError>
          ) : null}
        </div>
        <div>
          <InputField
            id="phone_number"
            name="phone_number"
            type="text"
            label="Telèfon"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleBlur(formik.values);
            }}
            value={formik.values.phone_number}
            valid={true}
          />
          {formik.touched.phone_number && formik.errors.phone_number ? (
            <LogFormError>{formik.errors.phone_number}</LogFormError>
          ) : null}
        </div>
        {dataHasChanged && (
          <div className="row">
            <div className="column">
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
                onClick={() => handleCancel(formik.setValues)}
              >
                Cancel·la
              </Button>
            </div>
            <div className="column">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
              >
                Guarda
              </Button>
            </div>
          </div>
        )}
        {loading && <span className="spinner-border spinner-border-sm"></span>}
      </form>
    </LogFormBox>
  );
}
