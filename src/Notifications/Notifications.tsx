import { FC, ReactNode } from "react";
import "./Notifications.css";
import { NotificationsSetter } from "./NotificationsSetter";

export enum NotificationType {
  MintPending = 0,
  MintSuccessful = 1,
  Error = 2,
}

type N = {
  id: string;
};

interface SuccessNotification extends N {
  type: NotificationType.MintSuccessful;
  explorerHref: string;
}

interface PendingNotification extends N {
  type: NotificationType.MintPending;
  explorerHref?: string;
}

interface ErrorNotification extends N {
  type: NotificationType.Error;
}

export type Notification =
  | SuccessNotification
  | PendingNotification
  | ErrorNotification;

const MintPendingNotificationContent: FC<PendingNotification> = ({
  explorerHref,
}) => {
  return (
    <>
      <div className="notification-icon">
        <img src="/icons/pendingIcon.svg" />
        <div className="spinner" />
      </div>
      <div className="notification-text">
        <p>Mint Pending...</p>
        <p>
          {explorerHref ? (
            <a href={explorerHref} target="_blank">
              View on Explorer
            </a>
          ) : null}
        </p>
      </div>
    </>
  );
};

const MintSuccessfulNotificationContent: FC<SuccessNotification> = ({
  explorerHref,
}) => {
  return (
    <>
      <div className="notification-icon">
        <img src="/icons/completeIconWhiteInside.svg" />
      </div>
      <div className="notification-text">
        <p>Mint Successful!</p>
        <p>
          <a href={explorerHref} target="_blank">
            View on Explorer
          </a>
        </p>
      </div>
    </>
  );
};

const ErrorNotificationContent: FC<ErrorNotification> = () => {
  return (
    <>
      <div className="notification-icon exclamation-mark">
        <img src="/icons/errorIcon.svg" />
      </div>
      <div className="notification-text">
        <p>We're sorry, an error has occurred.</p>
      </div>
    </>
  );
};

const Notification = ({
  notification,
  setNotifications,
}: {
  notification: SuccessNotification | PendingNotification | ErrorNotification;
  setNotifications: NotificationsSetter;
}) => {
  let content: ReactNode;
  switch (notification.type) {
    case NotificationType.MintPending:
      content = <MintPendingNotificationContent {...notification} />;
      break;
    case NotificationType.MintSuccessful:
      content = <MintSuccessfulNotificationContent {...notification} />;
      break;
    default:
      content = <ErrorNotificationContent {...notification} />;
      break;
  }

  return (
    <div className="notification">
      <img
        className="close-icon"
        src="/icons/closeIcon.svg"
        onClick={() => {
          setNotifications((prevState) =>
            prevState.filter((item) => item.id !== notification.id)
          );
        }}
      />
      {content}
    </div>
  );
};

export const Notifications: FC<{
  notifications: Notification[];
  setNotifications: NotificationsSetter;
}> = ({ setNotifications, notifications }) => {
  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification
          key={`${notification.type}-${notification.id}`}
          setNotifications={setNotifications}
          notification={notification}
        />
      ))}
    </div>
  );
};
