import styled from 'styled-components';

const BackgroundHeading = styled.h2`
  font-weight: 600;
  font-size: 2rem;
  z-index: 1;
  position: relative;
  font-style: italic;
  margin: 0;
  margin-bottom: 2.5rem;
  color: var(--white);
  transition: color 0.2s ease-out;

  @media ${props => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: rotate(-2deg);
    background: var(--primary);
  }
`;

export default BackgroundHeading;
