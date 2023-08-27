import React, { useState } from 'react';
import { Modal } from 'components/custom';
import { AddProjectModalMain } from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Input } from 'components/ui';
import { TApplyModalProps } from 'features/finance/elements/export-finance-modal/types';
import { ApplicationAPI } from 'api';
import { useSnackbar } from 'hooks';
import { AxiosError } from 'axios';

const ApplicationModal = ({ onClose, houseId, ...props }: TApplyModalProps) => {
  const [state, setState] = useState<any>({
    tier: null,
  });
  const { push } = useSnackbar();

  const handleApply = async () => {
    if (state.tier) {
      try {
        await ApplicationAPI.apply({ tier: state.tier.value, houseId }).then(
          async (data) => {
            push('Applied succesfully.', { variant: 'success' });
            onClose();
          }
        );
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
        {/* <Input
          type="text"
          label="Balance"
          value={null}
          onValue={() => {}}
          placeholder="Please Enter"
        /> */}
        <Input
          type="select"
          label="Application Type"
          value={state.tier}
          options={[
            {
              value: 'BASIC',
              label: 'Basic Tier (with 1 token)',
            },
            {
              value: 'MID',
              label: 'Middle Tier (with 10 token)',
            },
            {
              value: 'HIGH',
              label: 'High Tier (with 50 token)',
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
