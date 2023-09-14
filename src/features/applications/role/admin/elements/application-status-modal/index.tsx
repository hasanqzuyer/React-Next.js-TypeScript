import React from 'react';
import { useMenu, useSnackbar } from 'hooks';
import {
  ApproveIcon,
  DeclineIcon,
  FinishedIcon,
  ReceivedIcon,
  RecommendedIcon,
  VerticalDotsIcon,
  WithoutReportIcon,
} from 'components/svg';
import { TApplicationStatusProps } from './types';
import {
  ApplicationStatusActionsMain,
  ApplicationStatusActionsMenu,
  ISpan,
} from './styles';
import { ApplicationAPI } from 'api';
import { useRouter } from 'next/router';

const ApplicationStatusActions = ({
  reload,
  applicationId,
  userId,
  status,
  ...props
}: TApplicationStatusProps) => {
  const [menu, open, setOpen, buttonRef, position] = useMenu(false);

  const { push } = useSnackbar();
  const handleMenu = () => {
    setOpen(!open);
  };
  const router = useRouter();

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
      label: 'View',
      action: () => {
        router.push(`/users/overview?userId=${userId}`);
        handleMenu();
      },
    },
    {
      icon: <ApproveIcon />,
      label: 'Shortlist',
      action: () => {
        handleChange('Second Round');
        handleMenu();
      },
    },
    {
      icon: <DeclineIcon />,
      label: 'Reject',
      action: () => {
        handleChange('Not Selected');
        handleMenu();
      },
    },
    {
      icon: <RecommendedIcon />,
      label: 'Select',
      action: () => {
        handleChange('Selected');
        handleMenu();
      },
    },
    {
      icon: <WithoutReportIcon />,
      label: 'Accomodate',
      action: () => {
        handleChange('Accomodated');
        handleMenu();
      },
    },
  ];
  const ApplicationStatusActions2 = [
    {
      icon: <ReceivedIcon />,
      label: 'View',
      action: () => {
        router.push(`/users/overview?userId=${userId}`);
        handleMenu();
      },
    },
    {
      icon: <ApproveIcon />,
      label: 'Shortlist',
      action: () => {
        handleChange('Second Round');
        handleMenu();
      },
    },
    {
      icon: <DeclineIcon />,
      label: 'Reject',
      action: () => {
        handleChange('Not Selected');
        handleMenu();
      },
    },
    {
      icon: <RecommendedIcon />,
      label: 'Select',
      action: () => {
        handleChange('Selected');
        handleMenu();
      },
    },
    {
      icon: <WithoutReportIcon />,
      label: 'Accomodate',
      action: () => {
        handleChange('Accomodated');
        handleMenu();
      },
    },
    {
      icon: <FinishedIcon />,
      label: 'Widthdrawn',
      action: () => {
        handleChange('Widthdrawn');
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
          items={
            status === 'Accomodated'
              ? ApplicationStatusActions2
              : ApplicationStatusActions
          }
          ref={menu}
        />
      )}
    </ApplicationStatusActionsMain>
  );
};

export default ApplicationStatusActions;
