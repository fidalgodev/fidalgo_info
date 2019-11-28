import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 3rem;
  border-radius: 2px;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);
`;

// Tooltip button and wrappers
export const TooltipWrapper = styled.article`
  position: absolute;
  left: ${({ left }) => `${left}%`};
  top: ${({ top }) => `${top}%`};

  & .tooltipInnerWrapper {
    display: flex;
    height: 100%;
    width: 100%;
  }
`;

export const Indicator = styled.button`
  display: flex;
  z-index: ${({ isOpened }) => (isOpened ? '1' : '0')};
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: var(--background);
  border: none;
  cursor: pointer;
  box-shadow: 0 0.8rem 1.5rem var(--shadow-colorDark);
  transition: background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  @media ${props => props.theme.mediaQueries.small} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const StatusIcon = styled(FontAwesomeIcon)`
  transform: ${({ opened }) => (opened ? 'rotate(135deg)' : '')};
  transition: transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const TooltipContentWrapper = styled.div`
  max-width: 40rem;
  padding: 2.5rem;

  @media ${props => props.theme.mediaQueries.small} {
    padding: 2rem;
  }
`;

export const ItemTitle = styled.h1`
  color: var(--primary);
  font-weight: 700;
  font-size: 1.9rem;
  margin-top: 0.5rem;

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.8rem;
  }
`;

export const ItemDescription = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.5;
  margin-top: 2rem;
  color: var(--text-highlight);

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.5rem;
  }
`;

export const ItemLink = styled.p`
  color: var(--text-highlight);
  font-weight: 600;
  font-size: 1.6rem;
  margin-top: 1rem;

  & a {
    color: var(--primary);
  }

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.5rem;
  }
`;
