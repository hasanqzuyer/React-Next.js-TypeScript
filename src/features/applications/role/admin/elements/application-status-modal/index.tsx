import React from 'react';
import { useMenu, useSnackbar } from 'hooks';
import {
  ApproveIcon,
  DeclineIcon,
  ReceivedIcon,
  VerticalDotsIcon,
} from 'components/svg';
import UsersAPI from 'api/users';
import { TApplicationStatusProps } from './types';
import {
  ApplicationStatusActionsMain,
  ApplicationStatusActionsMenu,
  ISpan,
} from './styles';
import { ApplicationAPI } from 'api';

const ApplicationStatusActions = ({
  reload,
  applicationId,
  ...props
}: TApplicationStatusProps) => {
  const [menu, open, setOpen, buttonRef, position] = useMenu(false);

  const { push } = useSnackbar();
  const handleMenu = () => {
    setOpen(!open);
  };

  const handleChange = async (status: string) => {
    try {
      await ApplicationAPI.updateApplication({ status }, applicationId);
      reload();
      push(`Application status changed to  ${status} successfully!`, {
        variant: 'success',
      });
    } catch (e: any) {
      push(e.response.data.message, { variant: 'error' });
    }
  };

  const ApplicationStatusActions = [
    {
      icon: <ReceivedIcon />,
      label: 'Pending',
      action: () => {
        handleChange('Pending');
        handleMenu();
      },
    },
    {
      icon: <ApproveIcon />,
      label: 'Approved',
      action: () => {
        handleChange('Approved');
        handleMenu();
      },
    },
    {
      icon: <DeclineIcon />,
      label: 'Declined',
      action: () => {
        handleChange('Declined');
        handleMenu();
      },
    },
  ];

  return (
    <ApplicationStatusActionsMain>
      <ISpan ref={buttonRef}>
        <VerticalDotsIcon onClick={handleMenu} />
      </ISpan>
      {open && (
        <ApplicationStatusActionsMenu
          position={position}
          items={ApplicationStatusActions}
          ref={menu}
        />
      )}
    </ApplicationStatusActionsMain>
  );
};

export default ApplicationStatusActions;
