import React from "react";
import EventDetails from "./EventDetails";
import ProductDetails from "./ProductDetails";
import MembershipDetails from "./MembershipDetails";

const ItemDetails = ({ type, ...props }) => {
  switch (type) {
    case "ACTIVITAT":
      return <EventDetails {...props} />;
    case "PRODUCTE":
      return <ProductDetails {...props} />;
    case "SOCI":
      return <MembershipDetails {...props} />;
    default:
      return null;
  }
};

export default ItemDetails;
