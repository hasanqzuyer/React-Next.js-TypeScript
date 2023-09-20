import React, { useState, useEffect } from 'react';
import { Stack } from 'components/system';
import { Input, Checkbox } from 'components/ui';
import { birthDateSchema } from 'utilities/validators';
import moment from 'moment';

export const EducationExperienceDateRangePicker = ({ education, handleChange, handleErrors, userBirthDate, disabled}) => {

  const [fromDateInvokeValidationTimestamp, setFromDateInvokeValidationTimestamp] = useState<number | undefined>(undefined)
  const [toDateInvokeValidationTimestamp, setToDateInvokeValidationTimstamp] = useState<number | undefined>(undefined)

  const onFromChangeValue = (from: any) => {
    handleChange('from', from, education.id)
    setToDateInvokeValidationTimstamp(new Date().getTime())
  }

  const onToChangeValue = (to: any) => {
    handleChange('to', to, education.id)
    setFromDateInvokeValidationTimestamp(new Date().getTime())
  }

  return (
    <Stack direction="horizontal">
      <Input
        type="date"
        label="From"
        placeholder="Please Select"
        value={education.from}
        onValue={onFromChangeValue}
        errorCallback={handleErrors}
        invokeValidation={fromDateInvokeValidationTimestamp}
        enableInvokeValidation
        disabled={disabled}
        validators={[
          {
            message: 'Invalid Date!',
            validator: (birthDate: any) => {
              if (!education.to) return true;
              try {
                birthDateSchema.validateSync({ birthDate });
                return true;
              } catch {
                return false;
              }
            },
          },
          {
            message: 'From Date must must be less than To Date!',
            validator: (fromDate: any) => {
              if (!education.to) return true;
              return new Date(education.to) > new Date(fromDate);
            },
          },
          {
            message: 'From date must be greater than birthdate!',
            validator: (date: any) => {
              if (!userBirthDate || !date) return true;
              return new Date(userBirthDate) < new Date(date);
            }
          },
          {
            message: 'From date must not be future date!',
            validator: (date: any) => {
              if (!date) return true;
              return new Date() > new Date(date);
            }
          }
        ]}
      />
      <Input
        type="date"
        label="To"
        placeholder="Please Select"
        value={education.to}
        disabled={education.from == '' || education.from == null}
        onValue={onToChangeValue}
        errorCallback={handleErrors}
        invokeValidation={toDateInvokeValidationTimestamp}
        enableInvokeValidation
        validators={[
          {
            message: 'Invalid Date!',
            validator: (birthDate: any) => {
              try {
                birthDateSchema.validateSync({ birthDate });
                return true;
              } catch {
                return false;
              }
            },
          },
          {
            message: 'To date must be greater than birthdate!',
            validator: (date: any) => {
              if (!userBirthDate || !date) return true;
              return new Date(userBirthDate) < new Date(date);
            }
          },
          {
            message: 'To Date must be greater than From Date!',
            validator: (toDate: any) => {
              if (!toDate) return true;
              try {
                return new Date(education.from) < new Date(toDate);
              } catch {
                return false;
              }
            },
          },
          {
            message: 'To date must not be future date!',
            validator: (date: any) => {
              if (!date) return true;
              return new Date() > new Date(date);
            }
          },
          {
            message: 'To date is required!',
            validator: (date: any) => {
              return !(education.from && !date);
            },
          },
        ]}
      />
    </Stack>
  )
}

export default EducationExperienceDateRangePicker;