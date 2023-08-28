import React, { useEffect, useState } from 'react';
import { Modal } from 'components/custom';
import { TExportFinanceModalProps } from 'features/finance/elements/export-finance-modal/types';
import { AddProjectModalMain } from 'features/opportunities/role/admin/elements/add-project-modal/style';
import { Button, Input } from 'components/ui';
import FinaceAPI from 'api/finance';
import { formatPrice } from 'utilities/formatPrice';
import { useSnackbar } from 'hooks';

const ExportFinanceModal = ({
  onClose,
  ...props
}: TExportFinanceModalProps) => {
  const { push } = useSnackbar();

  const [quantity, setQuantity] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');

  useEffect(() => {
    async function fetchConfig() {
      try {
        const config = await FinaceAPI.getConfig();
        setAmount(config.unitAmount);
        setCurrency(config.currency);
      } catch (error) {
        push('Something went wrong!', { variant: 'error' });
      }
    }
    fetchConfig();
  }, []);

  const handleCheckout = async () => {
    try {
      const data = await FinaceAPI.createCheckoutSession({
        quantity: quantity,
      });
      window.open(data.url, '_blank', 'noopener,noreferrer');
      onClose();
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  return (
    <Modal
      size="small"
      title="Purchase"
      actions={[
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleCheckout}
        >
          Purchase {formatPrice(amount, currency, quantity)}
        </Button>,
      ]}
      onClose={onClose}
      {...props}
    >
      <AddProjectModalMain>
        <Input
          type="number"
          label="Token Amount"
          value={quantity}
          onValue={(quantity) => setQuantity(quantity)}
          placeholder="Please Enter"
        />
        {/* <Input
          type="select"
          label="Payment Currency"
          value={{
            label: currency,
            value: currency
          }}
          onValue={(currency) => setCurrency(currency.value)}
          placeholder="Please Select"
          options={[
            {
              value: 'USD',
              label: 'USD',
            },
            {
              value: 'EUR',
              label: 'EUR',
            }
          ]}
        /> */}

        {/* BASED ON SELECT OPTION HERE WILL DISPLAY DIFFERENT PAYMENT METHOD API  */}
      </AddProjectModalMain>
    </Modal>
  );
};

export default ExportFinanceModal;
