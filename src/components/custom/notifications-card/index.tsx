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
  const { role } = useAppContext();
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const getNotifications = async () => {
    const notificationData = await NotificationAPI.getNotificationsForMe();
    setNotifications(notificationData);
  };

  let socket;
  const connectionObject = {
    withCredentials: true,
  };
  const socketInitializer = async () => {
    socket = io(`${Project.websocketApi.v1}/`, connectionObject);

    socket.on('connect', () => {});

    socket.on('AdminUserRegistered', (msg) => {
      const newNotification = {
        id: msg.id,
        notification: msg,
        createdAt: msg.createdAt,
      };
      console.log(newNotification);
      setNotifications((data: any) => [newNotification, ...data]);
    });
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
