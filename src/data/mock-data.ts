import type {
  Sport,
  Location,
  Court,
  Level,
  Interest,
  User,
  Activity,
  KeepInTouchRequest,
  Connection,
  Notification,
  Report,
  ReportReason,
} from "@/types";

export const sports: Sport[] = [
  { id: "badminton", name: "Badminton", color: "#FF9500" },
  { id: "running", name: "Running", color: "#007AFF" },
];

export const locations: Location = {
  city: "Ho Chi Minh City",
  districts: [
    { id: "d1", name: "District 1", venues: ["Nguyen Du Sports Center", "Le Van Tam Park"] },
    { id: "d2", name: "District 2 (Thu Duc)", venues: ["Thu Duc Badminton Club", "Sala Park"] },
    { id: "d3", name: "District 3", venues: ["Cong Quynh Courts", "Turtle Lake Track"] },
    { id: "d7", name: "District 7 (Phu My Hung)", venues: ["SC VivoCity Courts", "Crescent Mall Track"] },
    { id: "binh_thanh", name: "Binh Thanh", venues: ["Binh Quoi Sports Club", "Van Thanh Park"] },
    { id: "tan_binh", name: "Tan Binh", venues: ["Hoang Van Thu Park", "TB Sports Center"] },
  ],
};

export const partnerCourts: Court[] = [
  { id: "court1", name: "Thu Duc Badminton Club", district: "d2", address: "123 Vo Van Ngan, Thu Duc", sports: ["badminton"], courts: 8, rating: 4.8, priceRange: "80k-120k/hr" },
  { id: "court2", name: "SC VivoCity Courts", district: "d7", address: "SC VivoCity, Nguyen Van Linh, D7", sports: ["badminton"], courts: 6, rating: 4.6, priceRange: "100k-150k/hr" },
  { id: "court3", name: "Phu Tho Sports Center", district: "d1", address: "1 Lu Gia, District 11", sports: ["badminton", "running"], courts: 12, rating: 4.5, priceRange: "60k-100k/hr" },
];

export const timeSlots = {
  morning: ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  afternoon: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
  evening: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
};

export const levels: Level[] = [
  { id: "beginner", label: "Beginner", description: "New to the sport" },
  { id: "intermediate", label: "Intermediate", description: "Play regularly" },
  { id: "advanced", label: "Advanced", description: "Competitive level" },
];

export const interests: Interest[] = [
  { id: "casual", label: "Casual & Fun", icon: "heart", description: "Relaxed games, no pressure" },
  { id: "competitive", label: "Competitive", icon: "target", description: "Play to win" },
  { id: "social", label: "Social", icon: "users", description: "Meet new people" },
  { id: "fitness", label: "Fitness", icon: "zap", description: "Stay active & healthy" },
];

export const users: User[] = [
  { id: "u1", name: "Minh T.", initials: "MT", level: { badminton: "intermediate", running: "beginner" }, interests: ["competitive", "evening"], playStyle: "focused" },
  { id: "u2", name: "Linh N.", initials: "LN", level: { badminton: "beginner", running: "intermediate" }, interests: ["casual", "social"], playStyle: "relaxed" },
  { id: "u3", name: "Duc P.", initials: "DP", level: { badminton: "advanced", running: "beginner" }, interests: ["competitive", "fitness"], playStyle: "focused" },
  { id: "u4", name: "Hoa V.", initials: "HV", level: { badminton: "intermediate", running: "advanced" }, interests: ["fitness", "morning"], playStyle: "energetic" },
  { id: "u5", name: "Tuan L.", initials: "TL", level: { badminton: "beginner", running: "intermediate" }, interests: ["casual", "learn"], playStyle: "relaxed" },
  { id: "u6", name: "Mai H.", initials: "MH", level: { badminton: "intermediate", running: "beginner" }, interests: ["social", "weekend"], playStyle: "energetic" },
];

export const activities: Activity[] = [
  {
    id: "act1",
    sport: "badminton",
    district: "d2",
    venue: "Thu Duc Badminton Club",
    date: "today",
    time: "7:00 PM",
    currentPlayers: ["u1", "u2", "u3", "u4"],
    maxPlayers: 6,
    level: "intermediate",
    hostId: "u1",
    description: "Casual doubles game, all skill levels welcome!",
  },
  {
    id: "act2",
    sport: "badminton",
    district: "d7",
    venue: "SC VivoCity Courts",
    date: "today",
    time: "8:00 PM",
    currentPlayers: ["u5", "u6"],
    maxPlayers: 4,
    level: "beginner",
    hostId: "u5",
    description: "Beginner friendly session. Let's have fun!",
  },
  {
    id: "act3",
    sport: "running",
    district: "d1",
    venue: "Le Van Tam Park",
    date: "today",
    time: "6:00 AM",
    currentPlayers: ["u4"],
    maxPlayers: 8,
    level: "intermediate",
    hostId: "u4",
    description: "Morning run around the park. 5km pace.",
  },
];

export const initialCurrentUser: User = {
  id: "current",
  name: "",
  initials: "",
  photo: null,
  level: {},
  interests: [],
  playStyle: undefined,
  isEnhanced: false,
  onboardingComplete: false,
};

export const initialNotifications: Notification[] = [
  {
    id: "notif1",
    type: "session_join",
    title: "New Player Joined",
    message: "Minh T. joined your badminton session",
    activityId: "act1",
    userId: "u1",
    createdAt: "2024-01-10T14:30:00",
    read: false,
  },
  {
    id: "notif2",
    type: "keep_in_touch",
    title: "Keep in Touch Request",
    message: "Hoa V. wants to keep in touch with you",
    userId: "u4",
    createdAt: "2024-01-10T12:15:00",
    read: false,
  },
];

export const reportReasons: { session: ReportReason[]; user: ReportReason[] } = {
  session: [
    { id: "no_show", label: "Host/Players did not show up" },
    { id: "wrong_info", label: "Incorrect venue or time" },
    { id: "inappropriate", label: "Inappropriate behavior" },
    { id: "safety", label: "Safety concern" },
    { id: "other", label: "Other" },
  ],
  user: [
    { id: "harassment", label: "Harassment or bullying" },
    { id: "inappropriate_content", label: "Inappropriate profile" },
    { id: "fake_profile", label: "Fake profile" },
    { id: "no_show", label: "Repeatedly no-shows" },
    { id: "other", label: "Other" },
  ],
};

// Helper functions
export function getUser(userId: string, currentUser: User): User | undefined {
  if (userId === "current") return currentUser;
  return users.find((u) => u.id === userId);
}

export function getDistrict(districtId: string) {
  return locations.districts.find((d) => d.id === districtId);
}

export function formatDate(dateKey: string): string {
  const dates: Record<string, string> = {
    today: "Today",
    tomorrow: "Tomorrow",
    this_week: "This Week",
    past: "Completed",
  };
  return dates[dateKey] || dateKey;
}
