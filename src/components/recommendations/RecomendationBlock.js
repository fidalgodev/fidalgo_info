import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const StyledSvg = styled(FontAwesomeIcon)`
  color: var(--primary);
  margin-left: 1rem;
  margin-top: 0.2rem;
  transition: transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const ResourceLink = styled.a`
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
      <h3>{title}</h3>
      <ResourcesWrapper>
        {children.map(({ title, link }) => (
          <ResourceLink key={title} target="_blank" href={link}>
            {title}
            <StyledSvg icon={faAngleRight} size="1x" />
          </ResourceLink>
        ))}
      </ResourcesWrapper>
    </>
  );
};

export default RecomendationBlock;
