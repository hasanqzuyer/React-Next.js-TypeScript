import React, { ReactNode } from 'react';

export type TMenuDropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Array<{
    icon?: ReactNode | string;
    label: string;
    action: () => void;
  }>;
};

export type TMenuDropdownRef = HTMLDivElement;
