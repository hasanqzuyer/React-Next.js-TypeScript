import React, { useState, useEffect } from 'react';
import { Stack } from 'components/system';
import { Input, Checkbox } from 'components/ui';
import { birthDateSchema } from 'utilities/validators';
import moment from 'moment';

export const WorkExperienceDateRangePicker = ({
  experience,
  handleChange,
  handleErrors,
  userBirthDate,
  disabled,
  hideCheckbox = false,
}) => {
  const [
    fromDateInvokeValidationTimestamp,
    setFromDateInvokeValidationTimestamp,
  ] = useState<number | undefined>(undefined);
  const [toDateInvokeValidationTimestamp, setToDateInvokeValidationTimstamp] =
    useState<number | undefined>(undefined);

  const onFromChangeValue = (from: any) => {
    handleChange('from', from, experience.id);
    setToDateInvokeValidationTimstamp(new Date().getTime());
  };

  const onToChangeValue = (to: any) => {
    handleChange('to', to, experience.id);
    setFromDateInvokeValidationTimestamp(new Date().getTime());
  };

  return (
    <Stack direction="horizontal" style={{ position: 'relative' }}>
      <Input
        type="date"
        label="From"
        placeholder="Please Select"
        value={experience.from}
        onValue={onFromChangeValue}
        errorCallback={handleErrors}
        invokeValidation={fromDateInvokeValidationTimestamp}
        enableInvokeValidation
        disabled={disabled}
        validators={[
          {
            message: 'Invalid Date!',
            validator: (birthDate: any) => {
              if (!experience.to) return true;
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
              if (!experience.to) return true;
              try {
                if (experience.stillWorkHere) {
                  return new Date() > new Date(fromDate);
                } else {
                  return new Date(experience.to) > new Date(fromDate);
                }
              } catch {
                return false;
              }
            },
          },
          {
            message: 'From date must be greater than birthdate!',
            validator: (date: any) => {
              if (!userBirthDate || !date) return true;
              return new Date(userBirthDate) < new Date(date);
            },
          },
          {
            message: 'From date must not be future date!',
            validator: (date: any) => {
              if (!date) return true;
              return new Date() > new Date(date);
            },
          },
        ]}
      />
      <Input
        type="date"
        label="To"
        placeholder="Please Select"
        value={experience.stillWorkHere ? null : experience.to}
        disabled={experience.stillWorkHere || experience.from == '' || disabled}
        onValue={onToChangeValue}
        errorCallback={handleErrors}
        invokeValidation={toDateInvokeValidationTimestamp}
        enableInvokeValidation
        validators={[
          {
            message: 'Invalid Date!',
            validator: (birthDate: any) => {
              if (experience.stillWorkHere || !birthDate) return true;
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
            },
          },
          {
            message: 'To Date must be greater than From Date!',
            validator: (toDate: any) => {
              if (experience.stillWorkHere || !toDate) return true;
              try {
                return new Date(experience.from) < new Date(toDate);
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
            },
          },
          {
            message: 'To date is required!',
            validator: (date: any) => {
              if (experience.stillWorkHere) return true;
              return !(experience.from && !date);
            },
          },
        ]}
      />
      {!hideCheckbox && (
        <Checkbox
          label="I still work here."
          style={{
            position: 'absolute',
            right: '0',
            bottom: '-25px',
          }}
          value={experience.stillWorkHere}
          onValue={(stillWorkHere) => {
            handleChange('stillWorkHere', stillWorkHere, experience.id);
            setFromDateInvokeValidationTimestamp(new Date().getTime());
            setToDateInvokeValidationTimstamp(new Date().getTime());
          }}
        />
      )}
    </Stack>
  );
};

export default WorkExperienceDateRangePicker;
