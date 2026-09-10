"use client";

import { useState, useEffect } from "react";
import { notificationService, Notification } from "@/lib/services/notificationService";

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      if (notification.message === "") {
        // Remove notification
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      } else {
        // Add or update notification
        setNotifications(prev => {
          const existing = prev.find(n => n.id === notification.id);
          if (existing) {
            return prev.map(n => n.id === notification.id ? notification : n);
          }
          return [...prev, notification];
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case "success":
        return "bg-secondary-container text-on-secondary-container border-secondary";
      case "error":
        return "bg-error-container text-on-error border-error";
      case "warning":
        return "bg-tertiary-container text-on-tertiary-container border-tertiary";
      default:
        return "bg-surface-container text-on-surface border-outline";
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-4 md:left-auto md:w-96 z-[9999] space-y-2 pointer-events-none">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border pointer-events-auto animate-in slide-in-from-bottom-2 ${getColors(notification.type)}`}
        >
          <span className="material-symbols-outlined flex-shrink-0">
            {getIcon(notification.type)}
          </span>
          <p className="flex-1 font-[family-name:var(--font-be-vietnam)] text-[14px] leading-[20px]">
            {notification.message}
          </p>
          <button
            onClick={() => notificationService.dismiss(notification.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
