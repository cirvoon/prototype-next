export interface Sport {
  id: string;
  name: string;
  color: string;
}

export interface District {
  id: string;
  name: string;
  venues: string[];
}

export interface Location {
  city: string;
  districts: District[];
}

export interface Court {
  id: string;
  name: string;
  district: string;
  address: string;
  sports: string[];
  courts: number;
  rating: number;
  priceRange: string;
}

export interface Level {
  id: string;
  label: string;
  description: string;
}

export interface Interest {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  level: Record<string, string>;
  interests: string[];
  playStyle?: string;
  photos?: string[];
  photo?: string | null;
  isEnhanced?: boolean;
  onboardingComplete?: boolean;
}

export interface Activity {
  id: string;
  sport: string;
  district: string;
  venue: string;
  date: "today" | "tomorrow" | "this_week" | "past";
  time: string;
  currentPlayers: string[];
  maxPlayers: number;
  level: string;
  hostId: string;
  description: string;
}

export interface KeepInTouchRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface Connection {
  id: string;
  user1Id: string;
  user2Id: string;
  connectedAt: string;
}

export interface Notification {
  id: string;
  type: "session_join" | "keep_in_touch" | "activity_invite" | "session_reminder";
  title: string;
  message: string;
  activityId?: string;
  userId?: string;
  createdAt: string;
  read: boolean;
}

export interface Report {
  id: string;
  type: "session" | "user";
  reporterId: string;
  targetId: string;
  reason: string;
  description: string;
  status: "pending" | "reviewed";
  createdAt: string;
}

export interface ReportReason {
  id: string;
  label: string;
}

export type ConnectionStatus = "none" | "pending_sent" | "pending_received" | "connected";
