import React, { useState } from 'react';
import { Modal } from 'components/custom';
import { AddProjectModalMain } from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Input } from 'components/ui';
import { TApplyModalProps } from 'features/finance/elements/export-finance-modal/types';
import { ApplicationAPI } from 'api';
import { useSnackbar } from 'hooks';
import { AxiosError } from 'axios';

const ApplicationModal = ({
  onClose,
  houseId,
  houseName,
  ...props
}: TApplyModalProps) => {
  const [state, setState] = useState<any>({
    tier: null,
  });
  const { push } = useSnackbar();

  const handleApply = async () => {
    if (state.tier) {
      try {
        await ApplicationAPI.apply({
          tier: state.tier.value,
          houseId,
          houseName,
        }).then(async (data) => {
          push('Applied succesfully.', { variant: 'success' });
          onClose();
        });
      } catch (e: any) {
        if (e instanceof AxiosError && e.response) {
          push(`Apply Failed!. ${e.response.data.message}`, {
            variant: 'error',
          });
        }
      }
    }
  };

  return (
    <Modal
      title="Application"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={state.tier === null}
          onClick={handleApply}
        >
          Apply
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <AddProjectModalMain columns={1}>
        <Input
          type="select"
          label="Application Type"
          value={state.tier}
          options={[
            {
              value: 'Basic',
              label: 'Basic Application',
            },
            {
              value: 'Priority',
              label: 'Priority Application',
            },
            {
              value: 'Premium',
              label: 'Premium Application',
            },
            {
              value: 'Elite',
              label: 'Elite Application',
            },
          ]}
          onValue={(tier) => setState({ ...state, tier })}
          placeholder="Please Select"
        />
      </AddProjectModalMain>
    </Modal>
  );
};

export default ApplicationModal;
