import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BotigaGeneral from "../components/botiga/BotigaGeneral";
import PowerTitle from "../components/layout/PowerTitle";
import ProductBanner from "../components/botiga/ProductBanner";
import SociDialog from "../components/botiga/Soci";
import LettersMove from "./../components/layout/LettersMove";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { API_URL, MEMBER_LIST } from "../utils/constants";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { deleteStringDecimals } from "../utils/utils";
import axiosInstance from "../axios";

function Botiga() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const data = useSelector((state) => state.data);
  const { membership = [] } = data;
  let location = useLocation();
  // eslint-disable-next-line no-undef
  const queryString = require("query-string");
  const value = queryString.parse(location.search);
  const externalId = value?.id;
  const id_soci = membership.map((x) => x.id);

  const handleOpen = () => {
    let arr = [];
    setLoading(true);
    axiosInstance
      .get(`${API_URL}subscriptions/${id_soci[0]}`, {})
      .then((resposta) => {
        arr.push(resposta.data);
        id_soci.length > 1 &&
          axiosInstance
            .get(`${API_URL}subscriptions/${id_soci[1]}`, {})
            .then((res) => {
              arr.push(res.data);
            });
      })
      .then(() => {
        setOpen(true);
        setProductData(arr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log(
            "ERROR: client received an error response (5xx, 4xx)",
            err.response
          );
        } else if (err.request) {
          console.log(
            "ERROR: client never received a response, or request never left",
            err.response
          );
        } else {
          console.log("ERROR: anything else", err);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery("(max-width:1163px)");
  const sociPreu = membership.filter((x) => MEMBER_LIST.includes(x.name))[0]
    ?.price_range;

  useEffect(() => {
    if (externalId === "14" || externalId === "15") {
      handleOpen();
    }
  }, []);

  return (
    <div className="Botiga">
      <PowerTitle title={t("menu.botiga")} className="SupportTitle" />
      <div className="clickBanner">
        <NavLink
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/memberships",
          }}
        >
          <ProductBanner
            title={
              isMobile
                ? t("banners.soci-curt")
                : `${t("banners.soci-llarg-pt1")}${deleteStringDecimals(
                    sociPreu
                  )}${t("banners.soci-llarg-pt2")}`
            }
            // handleClick={handleOpen}
          />
        </NavLink>
      </div>
      {open && (
        <SociDialog
          open={open}
          onClose={handleClose}
          dataRow={productData}
          setProductData={setProductData}
          loading={loading}
        />
      )}
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}

export default Botiga;
