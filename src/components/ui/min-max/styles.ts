import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const InputRow = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: flex;
    gap: ${theme.spacing(2)};
    align-items: flex-start;
    ${theme.breakpoints.down('sm')} {
      display: grid;
      gap: ${theme.spacing(4)};
      span {
        display: none;
      }
    }
  `}
`;

