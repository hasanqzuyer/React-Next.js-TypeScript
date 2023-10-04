import React, { useState } from 'react';
import { Modal } from 'components/custom';
import { AddProjectModalMain } from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Input } from 'components/ui';
import { TApplyModalProps } from 'features/finance/elements/export-finance-modal/types';
import { ApplicationAPI } from 'api';
import { useSnackbar } from 'hooks';
import { AxiosError } from 'axios';
import { useAppContext } from 'context';

const ApplicationModal = ({
  onClose,
  houseId,
  houseName,
  ...props
}: TApplyModalProps) => {
  const { user } = useAppContext();
  const [state, setState] = useState<any>({
    tier: {
      label: 'Basic (Cost: Free)',
      value: 'Basic',
    },
    balance: 0,
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
          push(`Application Unsuccessful: ${e.response.data.message}`, {
            variant: 'error',
          });
        }
      }
    }
  };

  const handleChangeTier = (tier: any) => {
    switch (tier?.value) {
      case 'Basic':
        setState((data: any) => ({
          ...data,
          tier,
          balance: 0,
        }));
        break;
      case 'Priority':
        setState((data: any) => ({
          ...data,
          tier,
          balance: 5,
        }));
        break;
      case 'Premium':
        setState((data: any) => ({
          ...data,
          tier,
          balance: 10,
        }));
        break;
      case 'Elite':
        setState((data: any) => ({
          ...data,
          tier,
          balance: 15,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <Modal
      size="medium"
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
      <AddProjectModalMain columns={2}>
        <Input
          type="text"
          label="Balance"
          value={`${user.tokenBalance} Tokens`}
          onValue={() => {}}
          placeholder="Please Enter"
        />
        <Input
          type="select"
          label="Application Type"
          value={state.tier}
          options={[
            {
              value: 'Basic',
              label: 'Basic (Cost: Free)',
            },
            {
              value: 'Priority',
              label: 'Priority (Cost: 5 Tokens)',
            },
            {
              value: 'Premium',
              label: 'Premium (Cost: 10 Tokens)',
            },
            {
              value: 'Elite',
              label: 'Elite (Cost: 15 Tokens)',
            },
          ]}
          onValue={(tier) => handleChangeTier(tier)}
          placeholder="Please Select"
        />
      </AddProjectModalMain>
    </Modal>
  );
};

export default ApplicationModal;
