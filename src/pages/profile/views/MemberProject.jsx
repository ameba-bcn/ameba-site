import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import InputField from "../../../components/forms/InputField/InputField";
import { LogFormBox, LogFormError } from "../../../components/forms/Log.style";
import { MemberProjectFrame } from "./MemberProject.style";
import Button from "../../../components/button/Button";
import { isEmptyObject } from "../../../utils/utils";
import TextArea from "../../../components/forms/TextArea/TextArea";
import authService from "../../../redux/services/auth.service";
import { useTranslation } from "react-i18next";
import ImageLoader from "../../../components/image-loader/ImageLoader";
import MediaLinksForm from "./components/MediaLinksForm";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { setUploadedImages } from "../../../redux/actions/profile";
import { validate } from "./MemberProjectValidate";

const MemberProject = () => {
  const [initialProjectData, setInitialProjectData] = useState({});
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(
    initialProjectData.description || ""
  );
  const [storedImages, setStoredImages] = useState([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const initialText =
    "Lorem fistrum hasta luego Lucas jarl qué dise usteer caballo blanco caballo negroorl la caidita ese pedazo de quietooor de la pradera. Sexuarl qué dise usteer se calle ustée amatomaa. Va usté muy cargadoo a peich a wan ese pedazo de hasta luego Lucas te voy a borrar el cerito. Caballo blanco caballo negroorl diodeno está la cosa muy malar te va a hasé pupitaa tiene musho peligro fistro. A wan ese pedazo de condemor te va a hasé pupitaa a gramenawer no puedor quietooor por la gloria de mi madre ese que llega ahorarr apetecan. Se calle ustée no puedor quietooor diodeno pecador.";
  const [t] = useTranslation("translation");
  useEffect(() => {
    authService
      .getMemberProject()
      .then((data) => {
        setLoading(false);
        setInitialProjectData(data);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (val) => {
    authService.updateMemberProject({ ...val, description: description });
  };

  const uploadImage = () => {
    images.map((img) => {
      authService.uploadImage(img).then((data) => {
        const { image } = data;
        // setStoredImages(storedImages.push(image));
        dispatch(setUploadedImages(String(image)));
      });
    });
  };
  console.log("initialProjectData", initialProjectData);
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

  const demoText =
    "En aquesta vista pots editar el teu projecte personal. Un cop guardats els canvis podràs visualitzar-ho a la vista de /soci@s";
  return (
    <MemberProjectFrame>
      <LogFormBox>
        <form className="formMembership" onSubmit={formik.handleSubmit}>
          <DisclaimerBox
            text={demoText}
            id="project-disclaimer"
            borderColor="black"
          />
          <div>
            <InputField
              id="project_name"
              name="project_name"
              type="text"
              label={t("form.titol")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.project_name}
              slimLine={true}
              valid={true}
            />
          </div>
          <TextArea
            id="description"
            name="description"
            initText={initialProjectData.description || ""}
            setText={setDescription}
            label={t("modal.descripcio")}
          />
          <MediaLinksForm label="afegeix un link" />

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
