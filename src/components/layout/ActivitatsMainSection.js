import React, { useState } from "react";
import CardNew from "./CardNew";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import ActivitatDialog from "../../pages/agenda/components/Activitat";
import styled from "styled-components";

export const StyledActivitatsMain = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 999px) {
    flex-direction: column;
  }
`;

export const StyledActivitatsCardItem = styled.div`
  box-sizing: border-box;
  margin: auto !important;
  width: 30.53%;
  height: auto;
  margin: 26px;
  @media screen and (max-width: 999px) {
    width: 70%;
    height: auto;
    padding-bottom: 25px;
  }
`;

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
        setEventData(res.data);
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
    <StyledActivitatsMain>
      {activitats &&
        activitats.map((data) => (
          <StyledActivitatsCardItem
            key={data.name}
            item
            className="Card3GridItem"
            onClick={() => fetchEvent(data)}
          >
            <CardNew
              className="CardIndividual"
              imatge={data.images[0]}
              titol={data.name}
              data={data.datetime}
              tipo={data.type}
            />
          </StyledActivitatsCardItem>
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
    </StyledActivitatsMain>
  );
};

export default React.memo(ActivitatsMainSection);
