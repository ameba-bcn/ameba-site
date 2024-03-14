import styled from "styled-components";

export const MemberProfileFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const MemberProfileBox = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-top: 30px;
`;

export const MemberProfileBoxBorder = styled.div`
  width: 100%;
  margin-bottom: 40px;
  & button {
    margin: 20px 0px;
  }
`;

export const MemberProfileTitle = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: 3.3rem;
  text-align: left;
  width: 100%;
  margin-bottom: 0px;
  text-align: center;
`;

export const MemberInfoRow = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: calc(12px + 1.3vw);
  margin: 0 auto;
  font-weight: 300;
  width: 85%;
  & span {
    font-weight: 600;
    cursor: pointer;
  }
`;

export const MessageFormat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
