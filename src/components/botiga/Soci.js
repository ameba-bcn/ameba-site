import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberToCart, getCart } from "../../redux/actions/cart";
import { setMemberCandidate } from "../../redux/actions/profile";
import { Redirect } from "react-router-dom";
import axiosInstance from "../../axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ModalCard from "../../modals/ModalCard";

export default function SociDialog(props) {
  const { onClose, selectedValue, open } = props;
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const dispatch = useDispatch();
  const [socisData, getSocisData] = useState([]);
  const [isSubscriber, setIsSubscriber] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const socisSubs =
    socisData.filter(function (soci) {
      return soci.name === "Socio";
    })[0] || {};
  const socisPro =
    socisData.filter(function (soci) {
      return soci.name === "Pro";
    })[0] || {};

  const { id, price_range, images } = isSubscriber ? socisSubs : socisPro;
  useEffect(() => {
    axiosInstance
      .get(`subscriptions/`, {})
      .then((res) => {
        getSocisData(res.data);
      })
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAddClick = (id) => {
    const selectedMembershipId =
      socisData.filter(function (soci) {
        return soci.id === id;
      })[0]?.variants[0] || {};
    dispatch(addMemberToCart(selectedMembershipId));
    if (user_profile === "LOGGED") {
      dispatch(getCart()).then(() => { // Aqui hay que tocar
        setRedirect(true);
        dispatch(setMemberCandidate());
      });
    } else {
      dispatch(setMemberCandidate());
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/membership-registration" />;
  }

  return (
    <ModalCard
      handleClose={handleClose}
      open={open}
      handleAddClick={handleAddClick}
      id={id}
      title="FES-TE SOCI/A!"
      price={price_range}
      imgArr={images}
      buttonText="AFEGIR A CISTELLA"
      buttonIcon={<ShoppingCartIcon />}
      box1Title={"DESCRIPCIÓ"}
      box1Text={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis. Mauris hendrerit risus ante, sed consectetur tellus vestibulum ut. Fusce ut aliquet erat. Donec in lacus maximus, ullamcorper enim vitae, euismod arcu."
      }
      box2Title={"BENEFICIS"}
      box2Text={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis. Mauris hendrerit risus ante, sed consectetur tellus vestibulum ut. Fusce ut aliquet erat. Donec in lacus maximus, ullamcorper enim vitae, euismod arcu."
      }
      type="SOCI"
      colorMode="dark"
      isSubscriber={isSubscriber}
      setIsSubscriber={setIsSubscriber}
    />
  );
}
