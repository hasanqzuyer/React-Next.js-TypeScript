import React, { forwardRef } from 'react';

import {
  MenuDropdownMain,
  MenuDropdownItem,
  MenuDropdownItemIcon,
  MenuDropdownItemLabel,
} from 'components/custom/menu-dropdown/styles';
import { TMenuDropdownProps, TMenuDropdownRef } from 'components/custom/menu-dropdown/types';

const MenuDropdown = forwardRef<TMenuDropdownRef, TMenuDropdownProps>(({ items, ...props }, ref) => {

  return (
    <MenuDropdownMain ref={ref} {...props}>
      {items.map((x) => (
        <MenuDropdownItem
          key={x.label}
          icon={x.icon ? 'icon' : ''}
          onClick={x.action}
        >
          {x.icon && <MenuDropdownItemIcon>{x.icon}</MenuDropdownItemIcon>}
          <MenuDropdownItemLabel>{x.label}</MenuDropdownItemLabel>
        </MenuDropdownItem>
      ))}
    </MenuDropdownMain>
  );
});

export default MenuDropdown;