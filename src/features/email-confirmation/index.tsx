import React, { useState, useEffect } from 'react';
import {
  EmailConfirmationMain,
  EmailConfirmationTitle,
  EmailButton,
} from 'features/email-confirmation/styles';
import { AxiosError } from 'axios';
import { useSnackbar } from 'hooks';
import { AuthorizationAPI } from 'api';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const EmailConfirmation = () => {
  const { t } = useTranslation('email-confirmation');
  const { push } = useSnackbar();

  const [message, setMessage] = useState('');

  const { query, locale } = useRouter();

  const handleChange = async () => {
    try {
      await AuthorizationAPI.emailConfirmation({ token: query.token as any });
      if (locale === 'de-DE') {
        push('Willkommen bei Brotherhood House!', { variant: 'success' });
        setMessage('Willkommen bei Brotherhood House!');
      } else {
        push('Welcome to Brotherhood House!', { variant: 'success' });
        setMessage('Welcome to Brotherhood House!');
      }
    } catch (e: any) {
      if (e instanceof AxiosError && e.response) {
        push(e.response.data.message, {
          variant: 'error',
        });
        setMessage(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (query.token) {
      handleChange();
    }
  }, [query]);

  return (
    <EmailConfirmationMain>
      <EmailConfirmationTitle>{message}</EmailConfirmationTitle>
      <EmailButton href="/login">
        {locale !== 'de-DE' ? 'Back' : 'Zurück'}
      </EmailButton>
    </EmailConfirmationMain>
  );
};

export default EmailConfirmation;
