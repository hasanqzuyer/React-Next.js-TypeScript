import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const HeaderMain = styled.header<{ theme?: Theme }>`
  ${({ theme }) => `
        position: absolute;
        top: 0;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Poppins', sans-serif;
        z-index: 10;

        ${theme.breakpoints.down('md')} {
          background: #fff;
          padding: 12px 18px !important;
        }
        ${theme.breakpoints.up('md')} {
          padding: 24px 2.5% 0;
        }
        ${theme.breakpoints.up('lg')} {
          padding: 24px 7.5% 0;
        }
        ${theme.breakpoints.up('xl')} {
          padding: 37px 12.5% 0;
        }
        `}
`;

export const HeaderLogo = styled.img<{ theme?: Theme }>`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      width: 180px;
    }
    ${theme.breakpoints.up('xs')} {
      width: 225px;
    }
  `}
`;

export const HeaderLogoLink = styled.a`
  text-decoration: none;
`;
