import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { updateMemberProfile } from "./../../redux/actions/auth";
import { deepComparision } from "./../../utils/utils";
import "./Forms.css";

const MemberProfileForm = ({ setButtonDisabled, initialValues = {} }) => {
  const form = useRef();
  const checkBtn = useRef();
  const [displayError, setDisplayError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [touched, setTouched] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [validName, setValidName] = useState(true);
  const [validSurname, setValidSurname] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const { address, first_name, last_name, phone_number } = initialValues;

  const initialUserData = {
    first_name,
    last_name,
    phone_number,
    address,
  };

  const [currentUserData, setCurrentUserData] = useState({
    first_name: first_name || "",
    last_name: last_name || "",
    phone_number: phone_number || "",
    address: address || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(updateMemberProfile(currentUserData))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setDisplayError(true);
          setSuccessful(false);
        });
    }
  };

  const handleCancel = () => {
    setCurrentUserData({
      first_name: initialUserData.first_name,
      last_name: initialUserData.last_name,
      phone_number: initialUserData.phone_number,
      address: initialUserData.address,
    });
  };

  const updateField = (e) => {
    setCurrentUserData({
      ...currentUserData,
      [e.target.name]: e.target.value,
    });
  };

  const required = (value, name) => {
    if (name.name === "first_name") {
      if (!value) {
        setValidName(false);
      } else {
        setValidName(true);
      }
    }
    if (name.name === "last_name") {
      if (!value) {
        setValidSurname(false);
      } else {
        setValidSurname(true);
      }
    }
    if (name.name === "address") {
      if (!value) {
        setValidAddress(false);
      } else {
        setValidAddress(true);
      }
    }
    if (name.name === "phone_number") {
      var phoneRexp = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i;
      const str = value ? value.toString() : "";
      if (!value || !phoneRexp.test(str)) {
        setValidPhone(false);
      } else {
        setValidPhone(true);
      }
    }
  };

  useEffect(() => {
    setCurrentUserData({
      first_name: first_name || "",
      last_name: last_name || "",
      phone_number: phone_number || "",
      address: address || "",
    });
  }, [initialValues]);

  useEffect(() => {
    const dataHasChanged = !deepComparision(currentUserData, initialUserData);
    setTouched(dataHasChanged);
    setButtonDisabled(dataHasChanged);
  }, [currentUserData]);

  return (
    <div className="col-md-12">
      <div className="card card-container card-member-profile-form">
        {/* <div className="logTitle">Dades personals</div> */}
        <Form onSubmit={handleSubmit} ref={form}>
          <div>
            <div className="form-group profileForm">
              <div className="form-group-field-box">
                <div className="form-group-field-title">Nom</div>
              </div>
              <Input
                type="text"
                className={
                  validName
                    ? "profileForm-group-field"
                    : "profileForm-group-first_name-error"
                }
                name="first_name"
                placeholder={currentUserData.first_name}
                value={currentUserData.first_name}
                onChange={updateField}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <div className="form-group-field-box">
                <div className="form-group-field-title">Cognoms</div>
              </div>
              <Input
                type="text"
                className={
                  validSurname
                    ? "profileForm-group-field"
                    : "profileForm-group-last_name-error"
                }
                name="last_name"
                placeholder={currentUserData.last_name}
                value={currentUserData.last_name}
                onChange={updateField}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <div className="form-group-field-box">
                <div className="form-group-field-title">Adreça</div>
              </div>
              <Input
                type="text"
                className={
                  validAddress
                    ? "profileForm-group-field"
                    : "profileForm-group-address-error"
                }
                name="address"
                placeholder={currentUserData.address}
                value={currentUserData.address}
                onChange={updateField}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <div className="form-group-field-box">
                <div className="form-group-field-title">Telèfon</div>
              </div>
              <Input
                type="text"
                className={
                  validPhone
                    ? "profileForm-group-field"
                    : "profileForm-group-phone_number-error"
                }
                name="phone_number"
                placeholder={currentUserData.phone_number}
                value={currentUserData.phone_number}
                onChange={updateField}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              {touched && (
                <div className="row">
                  <button
                    className="btn-block logFormButton"
                    onClick={() => handleCancel()}
                  >
                    Cancel·la
                  </button>
                  <button className="btn-block logFormButton">Guarda</button>
                </div>
              )}
            </div>
          </div>

          {displayError && message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default MemberProfileForm;
