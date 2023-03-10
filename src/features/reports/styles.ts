import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { Grid, Stack } from 'components/system';

export const ReportsPageMain = styled(Stack)`
  width: 100%;
`;

export const ReportsPageCharts = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${theme.spacing(5)};

  ${theme.breakpoints.down('xl')} {
    grid-template-columns: 1fr 1fr;
  }
  ${theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
  }
`}
`;

export const ReportsPageFilter = styled(Stack)<{ theme?: Theme }>`
  ${({ theme }) => `
        border-radius: 4px;
        border: 1px solid ${theme.palette.common.black}20;
        padding: ${theme.spacing(5)};
    `}
`;

export const ReportsPageFilterActions = styled(Stack)<{
  theme?: Theme;
}>`
  justify-content: flex-end;
  & > * {
    min-width: 100px;
  }
`;
