import { Notification } from "./Notifications";

export type NotificationsSetter = (
  arg: ((prevState: Notification[]) => Notification[]) | Notification[]
) => void;
