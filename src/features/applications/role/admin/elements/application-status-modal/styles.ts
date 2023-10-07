import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { Menu } from 'components/custom';

export const ApplicationStatusActionsMain = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: grid;
    place-items: center;
    position: relative;
    padding: ${theme.spacing(2)};
    cursor: pointer;
`}
`;

export const ApplicationStatusActionsMenu = styled(Menu)<{
  position: { right: number; bottom: number };
}>`
  ${({ position }) => `
  position: fixed;
  z-index: 200;
  width: 150px;
  right: ${position?.right}px;
  bottom: ${position?.bottom}px;
  `}
`;

export const ISpan = styled.div`
  cursor: pointer;
`;
