import styled from "styled-components";
import { StyledMainColumnView } from "../../../styles/GlobalStyles.style";

export const StyledAgendaTable = styled(StyledMainColumnView)`
  height: 100%;
  min-height: ${(props) => (props.$emptyView ? "400px" : "inherit")};
  table {
    width: 100%;
    margin: 0 auto;
    background-color: var(--color-cream);
    padding: 12px;
    border-radius: 4px;
    .search-row {
      float: right;
    }
    th {
      height: 60px;
      padding: 2px 4px;
    }

    tbody {
      tr {
        height: 150px;
        h1 {
          text-align: left;
          font-family: "Bebas Neue";
          font-weight: 400;
          font-size: 2.5rem;
          line-height: 0.8em;
          @media screen and (max-width: 1460px) {
            font-size: 2rem;
          }
          @media screen and (max-width: 1230px) {
            font-size: 1.6rem;
          }
        }
        .horaDataActivitat {
          text-align: center;
          justify-content: center;
          max-width: 160px;
          width: max-content;
          display: inline-block;
        }
      }

      tr:hover {
        background-color: rgba(0, 0, 0, 0.04);
        cursor: pointer;
      }
    }
  }
`;

export const StyledImageTableBox = styled.div`
  display: flex;
  .image-side {
    text-align: right;
    width: 40%;
    height: auto;
    float: left;
    img {
      width: 90%;
      height: auto;
      max-height: 120px;
      object-fit: cover;
      vertical-align: middle;
    }
  }
  .title-side {
    margin-left: 1em;
    width: 50%;
    display: flex;
    align-items: center;
    float: left;
  }
  :after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const StyledTicket = styled.div`
  display: flex;
  justify-content: center;
  div {
  }
  svg {
    scale: 2;
  }
`;
