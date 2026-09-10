'use client';

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number; // milliseconds, 0 = persistent
}

type NotificationCallback = (notification: Notification) => void;

class NotificationService {
  private listeners: Set<NotificationCallback> = new Set();
  private notifications: Map<string, Notification> = new Map();
  private nextId = 0;

  subscribe(callback: NotificationCallback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(notification: Notification) {
    this.notifications.set(notification.id, notification);
    this.listeners.forEach(listener => listener(notification));

    if (notification.duration !== 0) {
      setTimeout(() => {
        this.notifications.delete(notification.id);
        this.listeners.forEach(listener => listener({ ...notification, message: "" }));
      }, notification.duration || 3000);
    }
  }

  success(message: string, duration?: number) {
    this.notify({
      id: `notif-${++this.nextId}`,
      type: "success",
      message,
      duration,
    });
  }

  error(message: string, duration?: number) {
    this.notify({
      id: `notif-${++this.nextId}`,
      type: "error",
      message,
      duration,
    });
  }

  info(message: string, duration?: number) {
    this.notify({
      id: `notif-${++this.nextId}`,
      type: "info",
      message,
      duration,
    });
  }

  warning(message: string, duration?: number) {
    this.notify({
      id: `notif-${++this.nextId}`,
      type: "warning",
      message,
      duration,
    });
  }

  dismiss(id: string) {
    this.notifications.delete(id);
    this.listeners.forEach(listener => listener({ id, type: "info", message: "", duration: 0 }));
  }

  clear() {
    this.notifications.clear();
    this.listeners.forEach(listener => listener({ id: "clear", type: "info", message: "", duration: 0 }));
  }
}

// Lazy initialize singleton to avoid Turbopack module loading issues
let instance: NotificationService | null = null;

export const getNotificationService = (): NotificationService => {
  if (!instance) {
    instance = new NotificationService();
  }
  return instance;
};

// For backward compatibility, export as regular import
export const notificationService = {
  subscribe: (callback: NotificationCallback) => getNotificationService().subscribe(callback),
  success: (message: string, duration?: number) => getNotificationService().success(message, duration),
  error: (message: string, duration?: number) => getNotificationService().error(message, duration),
  info: (message: string, duration?: number) => getNotificationService().info(message, duration),
  warning: (message: string, duration?: number) => getNotificationService().warning(message, duration),
  dismiss: (id: string) => getNotificationService().dismiss(id),
  clear: () => getNotificationService().clear(),
};
