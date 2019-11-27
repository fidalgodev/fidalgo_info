import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 124rem;
  width: 100%;
  padding: 6rem 4rem;
  margin: 7rem auto 0 auto;
  flex: 1;
  color: var(--text);
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  flex-direction: column;
  transition: color 0.2s ease-out;

  @media ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 6rem;
    padding: 4rem 3rem;
  }

  @media ${({ theme }) => theme.mediaQueries.smaller} {
    padding: 3rem 2rem;
  }
`;

export const StyledSection = ({ center, children }) => (
  <Section>
    <Wrapper center={center}>{children}</Wrapper>
  </Section>
);
