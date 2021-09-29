import styled from "styled-components";

export const SubscriptionBoxStyle = styled.div`
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  border: 2px solid #f2c571;
  padding: 10px;
  max-width: 500px;
`;

export const SubscriptionTitleStatus = styled.div`
  display: block;
  width: fit-content;
  color: #fae6c5;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 1.2rem;
  line-height: 2em;
  padding: 0rem 0.6rem;
  margin-bottom: 5px;
  margin-left: 0.5rem;
  border-radius: 5px;
  ${(props) => {
    if (props.status === "close")
      return `
        background-color: yellow;
        `;
    else if (props.status === "inactive")
      return `
        background-color: red;
        `;
    else
      return `
        background-color: green;
        `;
  }}
`;

export const SubscriptionRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

export const SubscriptionTitle = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: 1.8rem;
  margin-top: 0px;
`;

export const SubscriptionData = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

export const SubscriptionSubtitle = styled.div`
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  text-align: left;
  width: 100%;
  color: #1d1d1b;
  font-size: 1rem;
  margin: 5px auto;
  font-weight: bold;
  & span {
    font-weight: normal;
  }
`;
