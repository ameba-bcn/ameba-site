import React from "react";
import CardNew from "./CardNew";
import { useNavigate } from "react-router-dom";
import "./ActivitatsMainSection.css";

const ActivitatsMainSection = (props) => {
  const { activitats } = props;
  const navigate = useNavigate();

  return (
    <div className="activitats-main">
      {activitats &&
        activitats.map((data) => (
          <div
            key={data.name}
            className="activitats-main__card-item Card3GridItem"
            onClick={() => navigate(`/activitats/${data.id}`)}
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
    </div>
  );
};

export default React.memo(ActivitatsMainSection);
