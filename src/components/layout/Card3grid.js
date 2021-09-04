import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CardNew from "./CardNew";
import ActivitatDialog from "./../agenda/Activitat";
import axiosInstance from "../../axios";
import "./Card3grid.css";

const Card3Grid = React.memo((props) => {
  const { activitats } = props;
  const [open, setOpen] = useState(false);
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
    axiosInstance
      .get(`events/${data.id}`, {})
      .then((res) => {
        setEventData(res.data);
      })
      .then(handleClickOpen())
      .catch((error) => {
        console.log("ERROL", error.response);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justify="center" className="Card3GridContainer">
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
          onClose={handleClose}
        />
      )}
    </Grid>
  );
});

export default Card3Grid;
