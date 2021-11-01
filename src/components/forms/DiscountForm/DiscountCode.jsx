import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./DiscountCodeValidate";
import { useFormik } from "formik";
import ErrorBox from "../error/ErrorBox";
import { DiscountRow } from "./DiscountCode.style";
import { isEmptyObject } from "../../../utils/utils";
import { applyDiscount } from "../../../redux/actions/cart";

export default function DiscountCode() {
  const dispatch = useDispatch();
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variant_ids = [] } = cart_data;
  const [loading, setLoading] = useState(false);
  const [errorsOnSubmit, setErrorsOnSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      handleSubmitDiscount(values);
    },
  });
  const handleSubmitDiscount = (value) => {
    setLoading(true);
    dispatch(applyDiscount(item_variant_ids, value.code))
      .then(() => {
        setErrorsOnSubmit(false);
        setLoading(false);
      })
      .catch(() => {
        setErrorsOnSubmit(true);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <DiscountRow>
        <InputField
          id="code"
          name="code"
          type="text"
          placeholder="Descompte"
          className="form-control logForm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          valid={1}
          unstyled={true}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          disabled={loading}
          hoverStyle="bg-red"
        >
          {loading ? (
            <span className="spinner-border"></span>
          ) : (
            <span>Aplica</span>
          )}
        </Button>
        {!isEmptyObject(formik.errors) && (
          <LogFormError>
            {Object.values(formik.errors).map((x) => {
              return <div key={x}>{x}</div>;
            })}
          </LogFormError>
        )}
      </DiscountRow>
      {errorsOnSubmit && <ErrorBox isError={errorsOnSubmit} />}
    </form>
  );
}
