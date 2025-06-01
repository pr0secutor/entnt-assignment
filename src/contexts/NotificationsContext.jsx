import { createContext, useState } from 'react';
import { localStorageUtils } from '../utils/localStorageUtils';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(localStorageUtils.getData('notifications'));

  const addNotification = (message) => {
    const newNotification = { id: `n${notifications.length + 1}`, message, timestamp: new Date().toISOString() };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorageUtils.setData('notifications', updatedNotifications);
  };

  const dismissNotification = (id) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    localStorageUtils.setData('notifications', updatedNotifications);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;