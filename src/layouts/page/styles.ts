import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const PageLayoutMain = styled.div<{ theme?: Theme }>`
${({ theme }) => `
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
    ${theme.breakpoints.down('md')} {
      height: 100%;
      overflow: unset;
    }
  `}
`;

export const PageLayoutContent = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    
    ${theme.breakpoints.down('md')} {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 1fr auto;
      gap: 100px;
      align-items: center;
      justify-content: unset;
    }   
    ${theme.breakpoints.down('sm')} {
      gap: 0;
    }
  `}
`;

export const PageLayoutLeft = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: grid;
    justify-content: flex-start;
    margin-top: 7%;
    min-height: 100vh;
    width: 100%;
    ${theme.breakpoints.down('lg')} {
      height: 0%;
    }

    ${theme.breakpoints.down('md')} {
      place-items: center flex-start;
      padding: 12px 18px !important;
      min-height: unset;
      height: 100%;
      margin-top: 0;
      order: 1
    }
    ${theme.breakpoints.up('md')} {
      padding: 0px 2.5% 0px;
    }
    ${theme.breakpoints.up('lg')} {
      padding: 0px 7.5% 0px;
    }
    ${theme.breakpoints.up('xl')} {
      padding: 0px 7.5% 0px 12.5%; 
    }
    `}
`;

export const PageLayoutRightContainer = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    min-height: 100%;
    overflow: hidden;
    width: 100%;
    img{
      height: 100%;
    }
  `}
`;

export const PageLayoutRight = styled.img<{ theme?: Theme }>`
  ${({ theme }) => `
      width: 100%;
      object-fit: cover;

      ${theme.breakpoints.down('md')} {
        width: 100%;
        height: 100%;
        order: -1;
        margin-top: 50px;
      }
    `}
`;
