import React, { useEffect, useState } from 'react';
import { Title } from 'components/core';
import { useAppContext } from 'context';
import { OpportunitiesPage } from 'features';
import { useRouter } from 'next/router';
import FinaceAPI from 'api/finance';
import { useModal } from 'hooks';
import ConfirmPaymentModal from 'features/finance/elements/confirm-payment-modal';

const PurchaseToken = () => {
  const { setRouteName } = useAppContext();
  const [crModal, openCrModal, closeCrModal] = useModal(false);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    setRouteName('Purchase Token Success');
  }, []);
  const { query } = useRouter();
  const router = useRouter();

  const handleChange = async () => {
    try {
      await FinaceAPI.confirmTokenTransaction({
        sessionId: query.session_id as string,
      });
      setMessage(
        'Congratulations! Your token purchase order has been successfully processed.'
      );
      openCrModal();
    } catch (e: any) {
      setMessage("Sorry. We're having trouble verifying your purchase.");
      openCrModal();
    }
  };

  useEffect(() => {
    if (query.session_id) {
      handleChange();
    }
  }, [query]);

  const handleCloseModal = () => {
    closeCrModal();
    router.push('/');
  };

  return (
    <>
      <Title>Home</Title>
      <OpportunitiesPage />
      {crModal && (
        <ConfirmPaymentModal onClose={handleCloseModal} message={message} />
      )}
    </>
  );
};
export default PurchaseToken;
