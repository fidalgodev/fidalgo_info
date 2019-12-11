import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';

import QuestionItem from '../components/faq/QuestionItem';
import { StyledSection } from '../layouts/elements';
import Heading from '../components/UI/heading';

const StyledAccordion = styled(Accordion)`
  width: 100%;
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

  console.log(questionsContent);

  return (
    <StyledSection>
      <Heading
        title="FAQ"
        subtitle="Here you'll find both my <span>work</span> and <span>home</span> setup <span>details</span>..."
      />
      <StyledAccordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        {questionsContent.childMarkdownRemark.frontmatter.questions.map(
          ({ question, answer }, i) => (
            <QuestionItem key={i} question={question} answer={answer} />
          )
        )}
      </StyledAccordion>
    </StyledSection>
  );
};

export default Faq;
