import React from 'react';
import {
  HeaderMain,
  HeaderLogo,
  HeaderLogoLink,
} from 'components/custom/header/styles';

const Header = ({ ...props }) => {
  return (
    <HeaderMain {...props}>
      <HeaderLogoLink href="/login">
        <HeaderLogo src="/static/assets/images/logo.png" />
      </HeaderLogoLink>
    </HeaderMain>
  );
};

export default Header;
