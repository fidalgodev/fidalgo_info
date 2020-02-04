import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import QuestionItem from '../components/faq/QuestionItem';
import Heading from '../components/UI/heading';
import { StyledSection } from '../layouts/elements';

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid;
  border-color: var(--text-highlight);
  background-color: var(--background);
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;

  & svg {
    margin-right: 2rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  color: var(--text-highlight);
  border: none;
  background-color: transparent;
  font-weight: 300;
  padding: 1.5rem 2rem;
  font-size: 2rem;
  transition: color 0.2s ease-in-out;

  &::placeholder {
    color: var(--text);
  }
`;

const NoMatches = styled.p`
  color: var(--text-highlight);
  border: none;
  background-color: transparent;
  font-weight: 500;
  padding: 1.5rem 2rem;
  font-size: 1.8rem;
  transition: color 0.2s ease-in-out;
`;

const Faq = () => {
  // GRAPHQL Query
  const { questionsContent } = useStaticQuery(graphql`
    query {
      questionsContent: file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        relativeDirectory: { regex: "/faq/" }
        name: { eq: "questions" }
      ) {
        childMarkdownRemark {
          frontmatter {
            questions {
              question
              answer
            }
          }
        }
      }
    }
  `);

  const [search, setSearch] = useState('');

  const filteredQuestions = questionsContent.childMarkdownRemark.frontmatter.questions.filter(
    ({ question, answer }) => {
      return (
        question.toLowerCase().includes(search.toLowerCase()) ||
        answer.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  return (
    <StyledSection>
      <Heading
        title="FAQ"
        subtitle="The <span>answers</span> to all your <span>questions</span> are probably here..."
      />
      <InputWrapper>
        <StyledInput
          type="text"
          value={search}
          placeholder="Search for a question here..."
          onChange={e => setSearch(e.target.value)}
        />
        <FontAwesomeIcon color="var(--primary)" icon={faSearch} size="2x" />
      </InputWrapper>
      <StyledAccordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        {filteredQuestions.length === 0 ? (
          <NoMatches>There are no questions matching your search.</NoMatches>
        ) : (
          filteredQuestions.map(({ question, answer }) => (
            <QuestionItem key={question} question={question} answer={answer} />
          ))
        )}
      </StyledAccordion>
    </StyledSection>
  );
};

export default Faq;
