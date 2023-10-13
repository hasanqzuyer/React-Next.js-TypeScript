import React from 'react';

import { TPageLayoutProps } from 'layouts/page/type';
import {
  PageLayoutMain,
  PageLayoutLeft,
  PageLayoutContent,
  PageLayoutRightContainer,
} from 'layouts/page/styles';
import { Header } from 'components/custom';

const PageLayout = ({ children, ...props }: TPageLayoutProps) => (
  <PageLayoutMain {...props}>
    <Header />
    <PageLayoutContent>
      <PageLayoutLeft>{children}</PageLayoutLeft>
      <PageLayoutRightContainer imageUrl={"/static/assets/images/authorization.jpg"} />
    </PageLayoutContent>
  </PageLayoutMain>
);

export default PageLayout;
