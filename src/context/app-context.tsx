"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { User, Activity, Notification, KeepInTouchRequest, Connection, Report } from "@/types";
import { initialCurrentUser, initialNotifications, activities as initialActivities, users } from "@/data/mock-data";

interface OnboardingState {
  name: string;
  photos: string[];
  selectedSports: string[];
  sportLevels: Record<string, string>;
}

interface AppState {
  // User
  currentUser: User;
  setCurrentUser: (user: User) => void;

  // Onboarding
  onboarding: OnboardingState;
  updateOnboarding: (updates: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;

  // Activities
  activities: Activity[];
  joinedActivities: string[];
  pastActivities: Activity[];
  joinActivity: (activityId: string) => void;
  leaveActivity: (activityId: string) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // Keep in Touch
  keepInTouchRequests: KeepInTouchRequest[];
  connections: Connection[];
  sendKeepInTouchRequest: (userId: string) => void;
  acceptKeepInTouchRequest: (userId: string) => void;
  declineKeepInTouchRequest: (userId: string) => void;
  getConnectionStatus: (userId: string) => "none" | "pending_sent" | "pending_received" | "connected";

  // Reports
  reports: Report[];
  submitReport: (type: "session" | "user", targetId: string, reason: string, description: string) => void;

  // Helpers
  getUser: (userId: string) => User | undefined;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(initialCurrentUser);
  const [onboarding, setOnboarding] = useState<OnboardingState>({
    name: "",
    photos: [],
    selectedSports: [],
    sportLevels: {},
  });
  const [activities] = useState<Activity[]>(initialActivities);
  const [joinedActivities, setJoinedActivities] = useState<string[]>(["act1", "act3"]);
  const [pastActivities] = useState<Activity[]>([
    {
      id: "past1",
      sport: "badminton",
      district: "d2",
      venue: "Thu Duc Badminton Club",
      date: "past",
      time: "7:00 PM",
      currentPlayers: ["u1", "u2", "u4"],
      maxPlayers: 4,
      level: "intermediate",
      hostId: "u1",
      description: "Great doubles game!",
    },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [keepInTouchRequests, setKeepInTouchRequests] = useState<KeepInTouchRequest[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const updateOnboarding = (updates: Partial<OnboardingState>) => {
    setOnboarding((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    const initials = onboarding.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    setCurrentUser({
      ...currentUser,
      name: onboarding.name,
      initials,
      photos: onboarding.photos,
      photo: onboarding.photos[0] || null,
      level: onboarding.sportLevels,
      onboardingComplete: true,
    });
  };

  const joinActivity = (activityId: string) => {
    if (!joinedActivities.includes(activityId)) {
      setJoinedActivities([...joinedActivities, activityId]);
    }
  };

  const leaveActivity = (activityId: string) => {
    setJoinedActivities(joinedActivities.filter((id) => id !== activityId));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const sendKeepInTouchRequest = (userId: string) => {
    const existing = keepInTouchRequests.find(
      (r) => r.fromUserId === "current" && r.toUserId === userId
    );
    if (existing) return;

    setKeepInTouchRequests([
      ...keepInTouchRequests,
      {
        id: `kit${Date.now()}`,
        fromUserId: "current",
        toUserId: userId,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const acceptKeepInTouchRequest = (userId: string) => {
    const request = keepInTouchRequests.find(
      (r) => r.fromUserId === userId && r.toUserId === "current" && r.status === "pending"
    );
    if (!request) return;

    setKeepInTouchRequests(
      keepInTouchRequests.map((r) =>
        r.id === request.id ? { ...r, status: "accepted" } : r
      )
    );
    setConnections([
      ...connections,
      {
        id: `conn${Date.now()}`,
        user1Id: "current",
        user2Id: userId,
        connectedAt: new Date().toISOString(),
      },
    ]);
  };

  const declineKeepInTouchRequest = (userId: string) => {
    setKeepInTouchRequests(
      keepInTouchRequests.filter(
        (r) => !(r.fromUserId === userId && r.toUserId === "current" && r.status === "pending")
      )
    );
  };

  const getConnectionStatus = (userId: string) => {
    const isConnected = connections.some(
      (c) =>
        (c.user1Id === "current" && c.user2Id === userId) ||
        (c.user1Id === userId && c.user2Id === "current")
    );
    if (isConnected) return "connected";

    const sentRequest = keepInTouchRequests.find(
      (r) => r.fromUserId === "current" && r.toUserId === userId && r.status === "pending"
    );
    if (sentRequest) return "pending_sent";

    const receivedRequest = keepInTouchRequests.find(
      (r) => r.fromUserId === userId && r.toUserId === "current" && r.status === "pending"
    );
    if (receivedRequest) return "pending_received";

    return "none";
  };

  const submitReport = (type: "session" | "user", targetId: string, reason: string, description: string) => {
    setReports([
      ...reports,
      {
        id: `rep${Date.now()}`,
        type,
        reporterId: "current",
        targetId,
        reason,
        description,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const getUser = (userId: string): User | undefined => {
    if (userId === "current") return currentUser;
    return users.find((u) => u.id === userId);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        onboarding,
        updateOnboarding,
        completeOnboarding,
        activities,
        joinedActivities,
        pastActivities,
        joinActivity,
        leaveActivity,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        keepInTouchRequests,
        connections,
        sendKeepInTouchRequest,
        acceptKeepInTouchRequest,
        declineKeepInTouchRequest,
        getConnectionStatus,
        reports,
        submitReport,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
