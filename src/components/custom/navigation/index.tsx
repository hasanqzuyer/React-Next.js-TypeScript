import React, { useState } from 'react';
import {
  NavigationMain,
  NavigationRouteName,
  NavigationItems,
  NavigationProfileOuter,
  NavigationProfile,
  NavigationProfileName,
  NavigationProfileDropdown,
  NavigationProvileIcon,
  NavigationMenu,
  NavigationMenuButton,
  NavigationNotification,
} from 'components/custom/navigation/styles';
import { NotificationModal } from 'components/custom/navigation/elements';
import { TNavigationProps } from 'components/custom/navigation/types';
import { useAppContext } from 'context';
import { ArrowDownIcon, BellIcon, LogoutIcon, MenuIcon } from 'components/svg';
import { useMenu, useModal } from 'hooks';
import { useRouter } from 'next/router';

const handleCurrencyCalculation = (
  amount: number,
  currency: 'EUR' | 'USD' | 'CHF' = 'CHF'
): number => {
  let formattedAmount = 0;

  if (currency === 'EUR') {
    formattedAmount = amount * 1.03;
  }
  if (currency === 'USD') {
    formattedAmount = amount * 1.11;
  }

  if (currency === 'CHF') {
    formattedAmount = amount; // Assumes the amount is already in euros for other currencies
  }

  return +formattedAmount.toFixed(2);
};

const Navigation = ({ ...props }: TNavigationProps) => {
  const [menuRef, open, setOpen, buttonRef] = useMenu(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [setOpenBalanceButton] = useMenu(false);

  const [nModal, openNModal, closeNModal] = useModal(false);

  const router = useRouter();

  const {
    logout,
    routeName,
    role,
    user,
    handleMobileMenu,
    showMobileMenu,
    handleCurrencyChange,
    currency,
  } = useAppContext();

  const [balance, setBalance] = useState(0);
  const [formattedBalance, setFormattedBalance] = useState(0);

  const handleMenu = () => {
    setOpen(!open);
  };
  const handleBalanceMenuClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    setOpenBalanceButton(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
    setOpen(!open);
  };

  const handleSidebar = () => {
    handleMobileMenu(!showMobileMenu);
  };

  return (
    <NavigationMain {...props}>
      <NavigationMenu>
        <NavigationMenuButton onClick={handleSidebar}>
          <MenuIcon />
        </NavigationMenuButton>
        <NavigationRouteName>{routeName}</NavigationRouteName>
      </NavigationMenu>
      <NavigationItems>
        <NavigationNotification onClick={openNModal}>
          <BellIcon />
        </NavigationNotification>
        <NavigationProfileOuter>
          <NavigationProfile onClick={handleMenu}>
            <NavigationProfileName>{`${user?.firstName} ${user?.lastName}`}</NavigationProfileName>
            <NavigationProvileIcon ref={buttonRef} expanded={open}>
              <ArrowDownIcon />
            </NavigationProvileIcon>
          </NavigationProfile>
          {open && ['ADMIN', 'USER'].includes(role) && (
            <NavigationProfileDropdown
              items={[
                {
                  icon: <LogoutIcon />,
                  label: 'Logout',
                  action: handleLogout,
                },
              ]}
              ref={menuRef}
            />
          )}
          {open && ['INFLUENCER', 'DEVELOPER', 'INVESTOR'].includes(role) && (
            <NavigationProfileDropdown
              items={[
                {
                  icon: <LogoutIcon />,
                  label: 'Logout',
                  action: handleLogout,
                },
              ]}
              ref={menuRef}
            />
          )}
        </NavigationProfileOuter>
      </NavigationItems>
      {nModal && <NotificationModal onClose={closeNModal} />}
    </NavigationMain>
  );
};

export default Navigation;
