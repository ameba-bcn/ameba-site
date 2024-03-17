import React, { useState } from "react";
import TitleSection from "../TitleSection";
import { MOBILE_NORMAL } from "../../../utils/constants";
import Icon from "../../ui/Icon";
import styled from "styled-components";
import useMediaQuery from "../../../hooks/use-media-query";

const StyledPlusBox = styled.div`
  display: flex;
  background-color: var(--color-negro);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  svg {
    vertical-align: super;
  }
`;

export default function QuestionsSection(props) {
  const { interview = {} } = props;
  const breakpoint = useMediaQuery(MOBILE_NORMAL);

  const [expand, setExpand] = useState({
    p: [false, false, false, false, false],
  });

  const updateExpand = (i) => {
    const newIds = expand.p.slice();
    newIds[i] = !newIds[i];
    setExpand({ p: newIds });
  };

  return (
    <div className="entrevista-gral">
      <TitleSection title="Entrevista" />
      <div className="entrevista-columnes">
        {!breakpoint ? (
          <>
            <div className="col1-preguntes">
              {interview.current_answers?.map((f, i) =>
                i < 3 ? (
                  <>
                    <div
                      className="pregunta"
                      key={i}
                      onClick={() => updateExpand(i)}
                    >
                      <div>{f.question}</div>
                      <StyledPlusBox>
                        {expand.p[i] ? (
                          <Icon
                            icon="minus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        ) : (
                          <Icon
                            icon="plus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        )}
                      </StyledPlusBox>
                    </div>
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </>
                ) : null
              )}
            </div>
            <div className="col2-preguntes">
              {interview.current_answers?.map((f, i) =>
                i > 2 ? (
                  <>
                    <div
                      className="pregunta"
                      key={i}
                      onClick={() => updateExpand(i)}
                    >
                      <div>{f.question}</div>
                      <StyledPlusBox>
                        {expand.p[i] ? (
                          <Icon
                            icon="minus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        ) : (
                          <StyledPlusBox>
                            <Icon
                              icon="plus"
                              type="yellow"
                              height={28}
                              width={28}
                              strokeWidth={2}
                            />
                          </StyledPlusBox>
                        )}
                      </StyledPlusBox>
                    </div>
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </>
                ) : null
              )}
            </div>
          </>
        ) : (
          <>
            {interview.current_answers?.map((f, i) => (
              <>
                <div
                  className="pregunta"
                  key={i}
                  onClick={() => updateExpand(i)}
                >
                  <div>{f.question}</div>
                  <StyledPlusBox>
                    {expand.p[i] ? (
                      <Icon
                        icon="minus"
                        type="yellow"
                        height={28}
                        width={28}
                        strokeWidth={2}
                      />
                    ) : (
                      <StyledPlusBox>
                        <Icon
                          icon="plus"
                          type="yellow"
                          height={28}
                          width={28}
                          strokeWidth={2}
                        />
                      </StyledPlusBox>
                    )}
                  </StyledPlusBox>
                </div>
                {expand.p[i] ? (
                  <div className={"resposta"}>{f.answer}</div>
                ) : null}
                <hr className="hr-section" />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
