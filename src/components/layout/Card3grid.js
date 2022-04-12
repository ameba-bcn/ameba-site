import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CardNew from "./CardNew";
import ActivitatDialog from "./../agenda/Activitat";
import axiosInstance from "../../axios";
import "./Card3grid.css";
import { API_URL } from "../../utils/constants";

const Card3Grid = React.memo((props) => {
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
    setLoading(true)
    axiosInstance
      .get(`${API_URL}events/${data.id}`, {})
      .then((res) => {
        setEventData(res.data);
        setLoading(false)
      })
      .then(handleClickOpen())
      .catch(err => {
        setLoading(false)
        if (err.response) {
          console.log("ERROR: client received an error response (5xx, 4xx)", err.response);
        } else if (err.request) {
          console.log("ERROR: client never received a response, or request never left", err.response);
        } else {
          console.log("ERROR: anything else", err);
        }
      })
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="center" className="Card3GridContainer">
      {activitats &&
        activitats.map((data) => (
          <Grid
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
          </Grid>
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
    </Grid>
  );
});

export default Card3Grid;
