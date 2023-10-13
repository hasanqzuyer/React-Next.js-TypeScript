import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const PageLayoutMain = styled.div<{ theme?: Theme }>`
${({ theme }) => `
  position: relative;
  display: flex;
  width: 100%;
    ${theme.breakpoints.down('md')} {
      height: 100%;
      overflow: unset;
    }
  `}
`;

export const PageLayoutContent = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    
    ${theme.breakpoints.down('md')} {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 1fr auto;
      gap: 50px;
      align-items: center;
      justify-content: unset;
    }   
    ${theme.breakpoints.down('sm')} {
      gap: 20px;
    }
  `}
`;

export const PageLayoutLeft = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: grid;
    justify-content: flex-start;
    width: 100%;
    ${theme.breakpoints.down('md')} {
      place-items: center flex-start;
      padding: 12px 18px !important;
      min-height: unset;
      height: 100%;
      margin-top: 0;
      order: 1
    }
    ${theme.breakpoints.up('md')} {
      padding: 0px 2.5% 2.5%;
    }
    ${theme.breakpoints.up('lg')} {
      padding: 0px 7.5% 2.5%;
    }
    ${theme.breakpoints.up('xl')} {
      padding: 0px 7.5% 0px 12.5%; 
    }

    & > div {
      margin-top: 30%;
      ${theme.breakpoints.down('md')} {
        margin-top: 0;
      }
    }
    `}
`;

export const PageLayoutRightContainer = styled.div<{ theme?: Theme, imageUrl?: string  }>`
  ${({ theme, imageUrl }) => `
    background-image: url(${imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
    ${theme.breakpoints.down('md')} {
      min-height: 900px;
    }
    ${theme.breakpoints.down('xs')} {
      min-height: 500px;
    }
  `}
`;