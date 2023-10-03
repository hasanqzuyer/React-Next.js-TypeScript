import styled from '@emotion/styled';
import { Tab, Tabs, Theme } from '@mui/material';

export const TabsMain = styled(Tabs)<{ theme?: Theme }>`
  width: fit-content;
  cursor: pointer;
  min-height: 32px;
  width: auto !important;
`;

export const TabsTab = styled(Tab)<{ theme?: Theme }>`
  ${({ theme }) => `
    text-transform: none;
    padding-top: 0px;
    min-height: 32px;
    ${theme.breakpoints.down('sm')} {
    min-width: 60px !important;
    font-size: 13px !important;
    }
  `}
`;
