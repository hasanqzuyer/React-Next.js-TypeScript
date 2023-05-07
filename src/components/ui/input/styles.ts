import styled from '@emotion/styled';
import { Theme, MenuItem, TextField, Autocomplete, Chip } from '@mui/material';
import { DesktopDatePicker, DesktopTimePicker } from '@mui/x-date-pickers';
import { Label } from 'components/ui';

export const InputMain = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `

    display: inline-flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
    vertical-align: top;
    width: 100%;
    .MuiInputBase-root {
      &.MuiInputBase-multiline {
        padding: 0;
      }
      .MuiInputBase-input {
        padding: ${theme.spacing(2)} !important;
        text-overflow: ellipsis;
      }
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.palette.primary.main}20;
      }
      &:hover {
        .MuiOutlinedInput-notchedOutline {
            border: 1px solid ${theme.palette.primary.main}50;
        }
      }
      &.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
              border: 1px solid ${theme.palette.secondary.main}ff;
        }
      }
    }
  `}
`;

export const InputLabel = styled(Label)<{ theme?: Theme }>`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(0.5)};
  `}
`;

export const InputSelect = styled(Autocomplete)`
  .MuiOutlinedInput-root {
    padding: 0 !important;
  }
`;

export const InputSelectItem = styled(MenuItem)``;

export const InputText = styled(TextField)``;

export const InputMultiSelect = styled(Autocomplete)`
  border: none !important;

  input,
  fieldset {
    border: none !important;
  }

  .MuiOutlinedInput-root {
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-bottom: 0 !important;
  }

  .MuiAutocomplete-endAdornment {
    top: 7.5px !important;
  }
`;

export const MultiSelectInputContainer = styled.div<{ theme?: Theme }>`
  border: 1px solid #2d377920;
  border-radius: 5px;

  max-height: 42px;
  overflow-y: scroll;

  &:active,
  &:focus {
    border-color: #448dc9ff;
  }
`;

export const InputDatepicker = styled(DesktopDatePicker)<{ theme?: Theme }>``;

export const InputTimepicker = styled(DesktopTimePicker)<{ theme?: Theme }>``;

export const InputRow = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: flex;
    gap: ${theme.spacing(2)};

    ${theme.breakpoints.down('sm')} {
      display: grid;
      gap: ${theme.spacing(4)};

      span {
        display: none;
      }
    }
  `}
`;

export const InputError = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    color: ${theme.palette.error.main};
    font-size: 12px;
    font-weight: 500;
  `}
`;

export const InputChip = styled(Chip)<{ theme?: Theme }>`
  ${({ theme }) => `
    .MuiChip-root-InputChip {
      background: ${theme.palette.secondary.main}5;
      color: ${theme.palette.secondary.main};
    }
    `}
`;
