import React, { useState, useEffect } from "react";
import Checkbox from "./../layout/CheckBox";
import { formatISODateToDate } from "../../utils/utils";
import Button from "../button/Button";
import "./SubscriptionBox.css";

export default function SubscriptionBox(props) {
  const { date = {}, disabled = false } = props;
  const { dataRenovacio = "" } = date;
  const [state, setState] = useState("active"); //active, close, inactive
  const [checked, setChecked] = useState(false);

  const dataRenove = formatISODateToDate(dataRenovacio);
  const currentIsoDate = new Date().toISOString();
  const statusText =
    state === "active"
      ? "Activa"
      : state === "close"
      ? "A punt de caducar"
      : "Caducada";

  useEffect(() => {
    console.log("currentIsoDate", currentIsoDate);
    console.log("dataRenovacio", dataRenovacio);
    console.log(
      "dataRenovacio < currentIsoDate",
      dataRenovacio < currentIsoDate
    );
    if (dataRenovacio < currentIsoDate) {
      setState("inactive");
    } else if (dataRenovacio - 6 >= currentIsoDate) {
      //menos 3 meses por ejemplo, calcular el valor correctamente
      setState("close");
    } else {
      setState("active");
    }
  }, []);

  const handleCheckboxChange = (event) => setChecked(event.target.checked);

  //Renovación activa: +1 año (9 meses antes de la caducidad)+
  //+Renovación caducada:

  return (
    <div className="subscription-box">
      <div className="subscription-box-in-row row">
        <div className="logTitleSmall">Subscripció:</div>
        <div className={"subscription-status-" + state}>{statusText}</div>
      </div>
      <div>
        {state !== "close" && (
          <>
            <div className="subscription-status-date">
              Data de renovació actual: {dataRenove}
            </div>
            {!checked && (
              <div className="subscription-status-date">
                Propera data de renovació:{dataRenovacio}
              </div>
            )}
          </>
        )}
        <label>
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          <span>Renovació anual automàtica</span>
        </label>
        <div className="subscription-row">
          <Button
            buttonStyle={`${
              disabled ? "boton--primary--disabled" : "boton--primary--solid"
            }`}
          >
            Renova
          </Button>
        </div>
      </div>
    </div>
  );
}
