import { useContext, useEffect } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';

function NotificationCenter() {
  const { notifications, dismissNotification } = useContext(NotificationsContext);

  useEffect(() => {
    const timers = notifications.map(notification => {
      return setTimeout(() => {
        dismissNotification(notification.id);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, dismissNotification]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map(n => (
        <div key={n.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <span>{n.message} <small>({new Date(n.timestamp).toLocaleString()})</small></span>
          <button
            onClick={() => dismissNotification(n.id)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationCenter;