import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import BackgroundHeading from '../UI/backgroundHeading';

const StyledSvg = styled(FontAwesomeIcon)`
  color: var(--primary);
  margin-left: 1rem;
  margin-top: 0.2rem;
  transition: transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const StyledResource = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  line-height: 1;
  color: var(--text-highlight);
  font-weight: 600;
  transition: color 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: var(--primary);
  }

  &:hover ${StyledSvg} {
    transform: translateX(0.5rem);
  }
`;

const ResourcesWrapper = styled.section`
  margin-bottom: 8rem;
`;

const RecomendationBlock = ({ title, children }) => {
  return (
    <>
      <BackgroundHeading>{title}</BackgroundHeading>
      <ResourcesWrapper>
        {children.map(({ title, link }) => (
          <StyledResource key={title} href={link}>
            {title}
            <StyledSvg icon={faAngleRight} size="1x" />
          </StyledResource>
        ))}
      </ResourcesWrapper>
    </>
  );
};

export default RecomendationBlock;
