import React, { useEffect, useState } from 'react';
import {
  NotificationsCardMain,
  NotificationsCardList,
} from 'components/custom/notifications-card/styles';

import { Notification } from 'components/custom/notifications-card/elements';
import {
  TNotification,
  TNotificationsCardProps,
} from 'components/custom/notifications-card/types';
import { useAppContext } from 'context';
import io from 'socket.io-client';
import Project from 'constants/project';
import { NotificationAPI } from 'api';

const NotificationsCard = ({ ...props }: TNotificationsCardProps) => {
  const {
    role,
    houseStatus,
    handleHouseStatus,
    userStatus,
    handleUserStatus,
    applicationStatus,
    handleApplicationStatus,
  } = useAppContext();
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const getNotifications = async () => {
    const notificationData = await NotificationAPI.getNotificationsForMe();
    setNotifications(notificationData);
  };

  let socket;
  const connectionObject = {
    withCredentials: true,
  };
  const AddNotification = (msg: any) => {
    const newNotification = {
      id: msg.id,
      notification: msg,
      createdAt: msg.createdAt,
    };
    setNotifications((data: any) => [newNotification, ...data]);
  };

  const changeHouseStatus = () => {
    const newStatus = houseStatus + 1;
    handleHouseStatus(newStatus);
  };

  const changeApplicationStatus = () => {
    const newStatus = applicationStatus + 1;
    handleApplicationStatus(newStatus);
  };

  const changeUserStatus = () => {
    const newStatus = userStatus + 1;
    handleUserStatus(newStatus);
  };

  const socketInitializer = async () => {
    try {
      socket = io(`${Project.websocketApi.v1}/`, connectionObject);
      socket.on('connect', () => {});
      socket.on('UserWelcomeRegistered', (msg) => {
        AddNotification(msg);
      });

      socket.on('UserAccountActivated', (msg) => {
        AddNotification(msg);
      });

      socket.on('UserTokenBalanceChanged', (msg) => {
        AddNotification(msg);
      });

      socket.on('UserNewHouseListed', (msg) => {
        AddNotification(msg);
        changeHouseStatus();
      });

      socket.on('UserHouseStatusChanged', (msg) => {
        AddNotification(msg);
      });

      socket.on('UserHouseMarketTypeChanged', (msg) => {
        AddNotification(msg);
      });

      socket.on('UserHouseInfoChanged', (msg) => {
        changeHouseStatus();
      });

      socket.on('UserApplicationReceived', (msg) => {
        AddNotification(msg);
        changeApplicationStatus();
      });

      socket.on('UserApplicationAccepted', (msg) => {
        AddNotification(msg);
        changeApplicationStatus();
      });

      socket.on('AdminUserRegistered', (msg) => {
        AddNotification(msg);
        changeUserStatus();
      });

      socket.on('AdminUserVerified', (msg) => {
        AddNotification(msg);
        changeUserStatus();
      });

      socket.on('AdminUserTokenPurchased', (msg) => {
        AddNotification(msg);
      });

      socket.on('AdminUserApplicationSent', (msg) => {
        AddNotification(msg);
        changeApplicationStatus();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
    socketInitializer();
  }, []);

  return (
    <>
      {['ADMIN', 'USER'].includes(role) && (
        <NotificationsCardMain title="Notifications" {...props}>
          <NotificationsCardList>
            {notifications.map(({ id, ...x }, index: any) => (
              <Notification key={index} {...x} />
            ))}
          </NotificationsCardList>
        </NotificationsCardMain>
      )}
    </>
  );
};

export default NotificationsCard;
