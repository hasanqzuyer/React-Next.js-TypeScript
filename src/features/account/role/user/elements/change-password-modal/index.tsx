import React, { useState } from 'react';
import { Modal } from 'components/custom';
import { TChangePasswordModalProps } from 'features/account/role/user/elements/change-password-modal/types';
import { ChangePasswordModalMain } from 'features/account/role/user/elements/change-password-modal/styles';
import { Button, Input } from 'components/ui';
import { Stack } from 'components/system';
import { useAppContext } from 'context';
import { useSnackbar } from 'hooks';
import { AuthorizationAPI } from 'api';

const ChangePasswordModal = ({
  onClose,
  ...props
}: TChangePasswordModalProps) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const { user } = useAppContext();

  const { push } = useSnackbar();

  const changePassword = async () => {
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
            type="text"
            label="Enter old password"
            placeholder="Please Enter"
            value={state.oldPassword}
            onValue={(oldPassword) => setState({ ...state, oldPassword })}
          />
          <Input
            type="text"
            label="Enter new password"
            placeholder="Please Enter"
            value={state.newPassword}
            onValue={(newPassword) => setState({ ...state, newPassword })}
          />
          <Input
            type="text"
            label="Repeat new password"
            placeholder="Please Enter"
            value={state.repeatNewPassword}
            onValue={(repeatNewPassword) =>
              setState({ ...state, repeatNewPassword })
            }
          />
        </ChangePasswordModalMain>
      </Stack>
    </Modal>
  );
};

export default ChangePasswordModal;
