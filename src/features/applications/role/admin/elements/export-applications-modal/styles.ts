import styled from '@emotion/styled';
import { Grid } from 'components/system';

export const ExportInfluencersModalMain = styled(Grid)<{ theme?: Theme }>`
  ${({ theme }) => `
    width: 100%;
    ${theme.breakpoints.down('sm')} {
      grid-template-columns: repeat(2, 1fr)
    }
  `}
`;