import React, { useState, useEffect } from 'react';
import { Modal } from 'components/custom';
import { TChangePasswordModalProps } from 'features/account/role/user/elements/change-password-modal/types';
import { ChangePasswordModalMain } from 'features/account/role/user/elements/change-password-modal/styles';
import { Button, Input } from 'components/ui';
import { Stack } from 'components/system';
import { useSnackbar } from 'hooks';
import { AuthorizationAPI } from 'api';
import { passwordSchema } from 'utilities/validators';

const ChangePasswordModal = ({ onClose, ...props }: any) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [errors, setErrors] = useState([false, false, false]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isDisabled =
      !state.oldPassword ||
      !state.newPassword ||
      !!errors.find((x) => x) ||
      !state.repeatNewPassword ||
      state.newPassword !== state.repeatNewPassword;

    setIsFormValid(!isDisabled);
  }, [state, errors]);

  const handleErrors = (index: any) => (value: any) => {
    setErrors((x) => x.map((a, b) => (b === index ? value : a)));
  };

  const { push } = useSnackbar();

  const changePassword = async () => {
    if (!isFormValid) return;

    try {
      await AuthorizationAPI.adminResetPassword(
        state.oldPassword,
        state.newPassword
      );
      push('Password successfully updated!', { variant: 'success' });
      onClose();
    } catch (e: any) {
      push(e.response.data.message, { variant: 'error' });
      onClose();
    }
  };

  return (
    <Modal
      size="small"
      title="Do you want to change password?"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={!isFormValid}
          onClick={changePassword}
        >
          Change password
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <Stack>
        <ChangePasswordModalMain columns={1}>
          <Input
            type="password"
            required
            label="Enter old password"
            placeholder="Please Enter"
            value={state.oldPassword}
            onValue={(oldPassword) => setState({ ...state, oldPassword })}
            validators={[
              {
                message: 'This field is required.',
                validator: (password) => !!password,
              },
              {
                message: 'Old password is required',
                validator: (password) => !!password.trim(),
              },
            ]}
          />
          <Input
            type="password"
            label="New Password"
            required
            placeholder="Please Enter your Password"
            value={state.newPassword}
            onValue={(newPassword) => setState({ ...state, newPassword })}
            errorCallback={handleErrors(0)}
            validators={[
              {
                message: 'This field is required.',
                validator: (password) => !!password,
              },
              {
                message: 'New Password is required',
                validator: (password) => !!password.trim(),
              },
              {
                message:
                  'Password must have at least one uppercase, lowercase letter, number and symbol',
                validator: (password) => {
                  try {
                    passwordSchema.validateSync({ password });
                    return true;
                  } catch {
                    return false;
                  }
                },
              },
              {
                message:
                  'New password should not be the same as the old password',
                validator: (password) => password !== state.oldPassword,
              },
            ]}
          />
          <Input
            type="password"
            label="Repeat new password"
            required
            placeholder="Please Enter"
            value={state.repeatNewPassword}
            onValue={(repeatNewPassword) =>
              setState({ ...state, repeatNewPassword })
            }
            errorCallback={handleErrors(1)}
            validators={[
              {
                message: 'This field is required.',
                validator: (password) => !!password,
              },
              {
                message:
                  'New password and confirmation password must be the same',
                validator: (password) => password === state.newPassword,
              },
            ]}
          />
        </ChangePasswordModalMain>
      </Stack>
    </Modal>
  );
};

export default ChangePasswordModal;
