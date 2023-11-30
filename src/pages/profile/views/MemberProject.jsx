import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validate } from "./MemberProjectValidate";
import InputField from "../../../components/forms/InputField/InputField";
import { LogFormBox, LogFormError } from "../../../components/forms/Log.style";
import { MemberProjectFrame } from "./MemberProject.style";
import Button from "../../../components/button/Button";
import { isEmptyObject } from "../../../utils/utils";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import TextArea from "../../../components/forms/TextArea/TextArea";
import authService from "../../../redux/services/auth.service";
import { useTranslation } from "react-i18next";
import ImageLoader from "../../../components/image-loader/ImageLoader";

const MemberProject = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialText =
    "Lorem fistrum hasta luego Lucas jarl qué dise usteer caballo blanco caballo negroorl la caidita ese pedazo de quietooor de la pradera. Sexuarl qué dise usteer se calle ustée amatomaa. Va usté muy cargadoo a peich a wan ese pedazo de hasta luego Lucas te voy a borrar el cerito. Caballo blanco caballo negroorl diodeno está la cosa muy malar te va a hasé pupitaa tiene musho peligro fistro. A wan ese pedazo de condemor te va a hasé pupitaa a gramenawer no puedor quietooor por la gloria de mi madre ese que llega ahorarr apetecan. Se calle ustée no puedor quietooor diodeno pecador.";
  const [text, setText] = useState(initialText);
  const [t] = useTranslation("translation");
  useEffect(() => {
    authService
      .getMemberProject()
      .then((data) => {
        console.log("recibimos data y seteamos valores", data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmitLogin = (val) => {
    console.log("val", { ...val, description: text, img: images });
    // authService.updateMemberProject({});
  };

  const formik = useFormik({
    initialValues: {
      title: "lelele",
      description: "",
      media: "",
      img: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  const demoText =
    "instrucciones de en que consiste visualizar tu proyecto, etc";
  console.log(text);
  return (
    <MemberProjectFrame>
      <DisclaimerBox
        text={demoText}
        id="project-disclaimer"
        borderColor="black"
      />
      <LogFormBox>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputField
              id="title"
              name="title"
              type="text"
              label={t("form.titol")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              slimLine={true}
              valid={true}
            />
          </div>
          <TextArea
            id="description"
            name="description"
            initText={initialText}
            setText={setText}
            label={t("modal.descripcio")}
          />
          <div>
            <InputField
              id="media"
              name="media"
              type="text"
              label="link"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.link}
              slimLine={true}
              valid={true}
            />
          </div>

          <ImageLoader maxNumber={4} images={images} setImages={setImages} />

          {!isEmptyObject(formik.errors) && (
            <LogFormError>
              {Object.values(formik.errors).map((x) => {
                return <div key={x}>{x}</div>;
              })}
            </LogFormError>
          )}
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
        </form>
      </LogFormBox>
    </MemberProjectFrame>
  );
};

export default MemberProject;
