"use client";

import { NavBar } from "@/components/ui/nav-bar";
import { useApp } from "@/context/app-context";
import { Icon, BellIcon } from "@/components/icons";

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const iconMap: Record<string, string> = {
  session_join: "users",
  keep_in_touch: "heart",
  activity_invite: "calendar",
  session_reminder: "clock",
};

const colorMap: Record<string, { bg: string; text: string }> = {
  session_join: { bg: "bg-ios-green/20", text: "text-ios-green" },
  keep_in_touch: { bg: "bg-ios-red/20", text: "text-ios-red" },
  activity_invite: { bg: "bg-ios-blue/20", text: "text-ios-blue" },
  session_reminder: { bg: "bg-ios-orange/20", text: "text-ios-orange" },
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
    // Could navigate to relevant screen here
  };

  if (notifications.length === 0) {
    return (
      <div className="h-full bg-ios-gray6 flex flex-col">
        <NavBar title="Notifications" />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 text-ios-gray3 mb-4">
            <BellIcon className="w-full h-full" />
          </div>
          <h3 className="text-headline font-semibold mb-2">No Notifications</h3>
          <p className="text-subheadline text-ios-gray">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Notifications" />

      <div className="flex-1 overflow-auto">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-footnote font-semibold text-ios-gray uppercase tracking-wide">
                New
              </span>
              <button
                onClick={markAllNotificationsRead}
                className="text-caption-1 text-ios-blue font-medium"
              >
                Mark all as read
              </button>
            </div>
            <div className="bg-white">
              {unreadNotifications.map((notification) => {
                const colors = colorMap[notification.type];
                return (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="w-full flex items-start gap-3 px-4 py-3 border-b border-ios-gray5 bg-ios-blue/5 active:bg-ios-gray6"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}
                    >
                      <Icon name={iconMap[notification.type]} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold text-subheadline mb-0.5">
                        {notification.title}
                      </div>
                      <div className="text-subheadline text-ios-gray mb-1 line-clamp-2">
                        {notification.message}
                      </div>
                      <div className="text-caption-1 text-ios-gray2">
                        {getTimeAgo(notification.createdAt)}
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 bg-ios-blue rounded-full flex-shrink-0 mt-1.5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <div className="px-4 py-2">
              <span className="text-footnote font-semibold text-ios-gray uppercase tracking-wide">
                Earlier
              </span>
            </div>
            <div className="bg-white">
              {readNotifications.map((notification) => {
                const colors = colorMap[notification.type];
                return (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="w-full flex items-start gap-3 px-4 py-3 border-b border-ios-gray5 active:bg-ios-gray6"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}
                    >
                      <Icon name={iconMap[notification.type]} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold text-subheadline mb-0.5">
                        {notification.title}
                      </div>
                      <div className="text-subheadline text-ios-gray mb-1 line-clamp-2">
                        {notification.message}
                      </div>
                      <div className="text-caption-1 text-ios-gray2">
                        {getTimeAgo(notification.createdAt)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
