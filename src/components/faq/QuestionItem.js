import React from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemState,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const StyledAccordionItem = styled(AccordionItem)`
  background-color: var(--tooltipBackground);
  border-radius: 0.5rem;
  box-shadow: 0 0.8rem 1.5rem var(--shadow-color);

  &:not(:first-child) {
    margin-top: 3rem;
  }
`;

const Question = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem;
  font-size: 2rem;
  color: var(--text-highlight);
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease-in-out;
`;

const AnswerContainer = styled(AccordionItemPanel)`
  padding: 2.5rem;
  font-size: 1.6rem;
  line-height: 1.8;
  color: var(--white);
  font-weight: 600;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--primary);
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
`;

const StyledSvg = styled(FontAwesomeIcon)`
  color: var(--primary);
  transform: ${({ expanded }) => `rotate(${expanded ? '180' : '0'}deg)`};
  transition: transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const QuestionItem = ({ question, answer }) => {
  return (
    <StyledAccordionItem>
      <AccordionItemHeading>
        <Question>
          {question}
          <AccordionItemState>
            {({ expanded }) =>
              expanded ? (
                <StyledSvg
                  icon={faAngleDown}
                  size="1x"
                  expanded={expanded ? 1 : 0}
                />
              ) : (
                <StyledSvg
                  icon={faAngleDown}
                  size="1x"
                  expanded={expanded ? 1 : 0}
                />
              )
            }
          </AccordionItemState>
        </Question>
      </AccordionItemHeading>
      <AnswerContainer>
        <p>{answer}</p>
      </AnswerContainer>
    </StyledAccordionItem>
  );
};

export default QuestionItem;
