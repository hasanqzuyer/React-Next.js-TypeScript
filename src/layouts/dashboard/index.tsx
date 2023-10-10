import React, { useState, useEffect } from 'react';
import {
  DashboardLayoutMain,
  DashboardLayoutNavbar,
  DashboardLayoutBox,
  DashboardLayoutSidebar,
  DashboardLayoutContainer,
  DashboardLayoutContainerOuter,
  DashboardLayoutContent,
  DashboardLayoutWidgets,
} from 'layouts/dashboard/styles';
import { TDashboardLayoutProps } from 'layouts/dashboard/types';
import { CalendarCard, NotificationsCard } from 'components/custom';
import { useAppContext } from 'context';

const DashboardLayout = ({ children, ...props }: TDashboardLayoutProps) => {
  const { showMobileMenu, handleMobileMenu } = useAppContext();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width >= 1200) {
      handleMobileMenu(true);
    } else {
      handleMobileMenu(false);
    }
  }, [width]);

  return (
    <DashboardLayoutMain {...props} showMobileMenu={showMobileMenu}>
      <DashboardLayoutNavbar />
      <DashboardLayoutBox>
        <DashboardLayoutSidebar/>
        <DashboardLayoutContainerOuter className="overflow-y-hidden">
          <DashboardLayoutContainer>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
            <DashboardLayoutWidgets>
              <CalendarCard />
              <NotificationsCard />
            </DashboardLayoutWidgets>
          </DashboardLayoutContainer>
        </DashboardLayoutContainerOuter>
      </DashboardLayoutBox>
    </DashboardLayoutMain>
  );
};

export default DashboardLayout;
