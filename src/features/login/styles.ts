import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { LocalizationSelect } from 'components/custom';
import { Stack } from 'components/system';
import Link from 'next/link';

export const LoginMain = styled.div<{ theme?: Theme }>`
  // ${({ theme }) => `
    font-family: 'Poppins', sans-serif;
  // `}
`;

export const LoginContainer = styled.div``;

export const RegisterLink = styled(Link)<{theme?: Theme}>`
${({ theme }) => `
  font-family: 'Poppins', sans-serif;
  position: absolute;
  right: 7.5%;
  top: 24px;
  z-index: 11;
  text-decoration: none;
  ${theme.breakpoints.down('md')} {
    top: 12px;
  }
  ${theme.breakpoints.down('xs')} {
    top: 15px;
  }
  button {
    border-radius: 20rem;
    font-weight: 700;
    padding: 15px 24px;
    font-size: 18px;
    ${theme.breakpoints.down('xs')} {
      padding: 10px 20px;
      font-size: 14px;
    }
`}
`;

export const LoginTitle = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    font-size: 48px;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: 'Poppins', sans-serif;
    ${theme.breakpoints.down('sm')} {
      font-size: 40px;
    }
    `}
`;

export const LoginSubtitle = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    font-size: 20px;
    color: ${theme.palette.primary.main};
    opacity: 0.72;
    font-family: 'Poppins', sans-serif;
    margin-top: -18px;
    margin-bottom: 18px;
    ${theme.breakpoints.down('sm')} {
      font-size: 15px;
    }
`}
`;

export const LoginSpan = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    color: ${theme.palette.primary.main};
    cursor: pointer;
    ${theme.breakpoints.down('sm')} {
      font-size: 14px;
    }
`}
`;

export const LoginAction = styled(Stack)<{ theme?: Theme }>`
  ${({ theme }) => `
    display: flex;
    justify-content: flex-end;
    ${theme.breakpoints.down('sm')} {
      flex-direction: column;
    }
  `}
`;

export const LoginLocalization = styled(LocalizationSelect)`
  margin: 0 auto;
`;
