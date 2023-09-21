import React from 'react';

import {
  HeaderMain,
  HeaderLogo,
  HeaderActions,
  HeaderAction,
  HeaderLogoLink,
} from 'components/custom/header/styles';

import { Button } from 'components/ui';
import { useTranslation } from 'react-i18next';

const Header = ({ ...props }) => {
  const { t } = useTranslation('common');

  return (
    <HeaderMain {...props}>
      <HeaderLogoLink href="/login">
        <HeaderLogo src="/static/assets/images/logo.png" />
      </HeaderLogoLink>
      <HeaderActions>
        <HeaderAction style={{ color: '#fff' }} href="/login">
          <Button variant="contained" color="primary" size="large">
            {'LOGIN'}
          </Button>
        </HeaderAction>
        <HeaderAction style={{ color: '#fff' }} href="/register">
          <Button variant="contained" color="secondary" size="large">
            {t('SIGN UP')}
          </Button>
        </HeaderAction>
      </HeaderActions>
    </HeaderMain>
  );
};

export default Header;
