import React, { useState } from 'react';
import { Modal } from 'components/custom';
import { AddProjectModalMain } from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Input } from 'components/ui';
import { TApplyModalProps } from 'features/finance/elements/export-finance-modal/types';

const ExportFinanceModal = ({ onClose, ...props }: TApplyModalProps) => {
  const [state, setState] = useState<any>({
    tier: null,
  });

  return (
    <Modal
      title="Application"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={onClose}
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
              value: 1,
              label: 'Base Tier(with 1 token)',
            },
            {
              value: 10,
              label: 'Middle Tier(with 10 token)',
            },
            {
              value: 50,
              label: 'High Tier(with 50 token)',
            },
          ]}
          onValue={(tier) => setState({ ...state, tier })}
          placeholder="Please Select"
        />
      </AddProjectModalMain>
    </Modal>
  );
};

export default ExportFinanceModal;
