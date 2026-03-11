import React, { useState } from "react";
import CardNew from "./CardNew";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import ActivitatDialog from "../../pages/agenda/components/Activitat";
import "./ActivitatsMainSection.css";

const ActivitatsMainSection = (props) => {
  const { activitats } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState([
    {
      id: 0,
      name: "",
      price: "",
      images: [""],
      discount: "",
      datetime: "",
      address: "",
      description: "",
      saved: "",
      purchased: "",
      stock: 0,
      is_active: false,
      artists: [false],
    },
  ]);

  const fetchEvent = (data) => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}events/${data.id}`, {})
      .then((res) => {
        setEventData(res?.data);
        setLoading(false);
      })
      .then(handleClickOpen())
      .catch((err) => {
        setLoading(false);
        console.warn("ERROR: ", err);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="activitats-main">
      {activitats &&
        activitats.map((data) => (
          <div
            key={data.name}
            className="activitats-main__card-item Card3GridItem"
            onClick={() => fetchEvent(data)}
          >
            <CardNew
              className="CardIndividual"
              imatge={data.images[0]}
              titol={data.name}
              data={data.datetime}
              tipo={data.type}
            />
          </div>
        ))}
      {open && (
        <ActivitatDialog
          open={open}
          dataRow={eventData}
          setEventData={setEventData}
          onClose={handleClose}
          loading={loading}
        />
      )}
    </div>
  );
};

export default React.memo(ActivitatsMainSection);
