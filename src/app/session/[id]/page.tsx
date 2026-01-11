"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/nav-bar";
import { useApp } from "@/context/app-context";
import { Icon, MapPinIcon, ClockIcon, UsersIcon, FlagIcon } from "@/components/icons";
import { sports, getDistrict, formatDate } from "@/data/mock-data";

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const {
    activities,
    pastActivities,
    joinedActivities,
    joinActivity,
    leaveActivity,
    getUser,
    getConnectionStatus,
    sendKeepInTouchRequest,
    acceptKeepInTouchRequest,
  } = useApp();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<"session" | "user">("session");
  const [reportTargetId, setReportTargetId] = useState<string | null>(null);
  const [reportTargetName, setReportTargetName] = useState<string>("");
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  // Find activity in both current and past
  const activity = [...activities, ...pastActivities].find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="h-full bg-ios-gray6 flex flex-col">
        <NavBar title="Session" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-ios-gray">Session not found</p>
        </div>
      </div>
    );
  }

  const sport = sports.find((s) => s.id === activity.sport);
  const district = getDistrict(activity.district);
  const isJoined = joinedActivities.includes(activity.id);
  const isPast = activity.date === "past";
  const isFull = activity.currentPlayers.length >= activity.maxPlayers;
  const players = activity.currentPlayers.map((id) => getUser(id)).filter(Boolean);
  const host = getUser(activity.hostId);

  const handleJoin = () => {
    joinActivity(activity.id);
  };

  const handleLeave = () => {
    leaveActivity(activity.id);
  };

  const handleKeepInTouch = (userId: string) => {
    const status = getConnectionStatus(userId);
    if (status === "none") {
      sendKeepInTouchRequest(userId);
    } else if (status === "pending_received") {
      acceptKeepInTouchRequest(userId);
    }
  };

  const getKeepInTouchLabel = (userId: string) => {
    const status = getConnectionStatus(userId);
    switch (status) {
      case "connected":
        return "Connected";
      case "pending_sent":
        return "Request Sent";
      case "pending_received":
        return "Accept";
      default:
        return "Keep in Touch";
    }
  };

  const openReportSession = () => {
    setReportType("session");
    setReportTargetId(activity?.id || null);
    setReportTargetName("");
    setShowReportModal(true);
  };

  const openReportUser = (userId: string, userName: string) => {
    setReportType("user");
    setReportTargetId(userId);
    setReportTargetName(userName);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportReason("");
    setReportDescription("");
    setReportTargetId(null);
    setReportTargetName("");
  };

  const sessionReportReasons = [
    { id: "no_show", label: "Host/Players did not show up" },
    { id: "wrong_info", label: "Incorrect venue or time" },
    { id: "inappropriate", label: "Inappropriate behavior" },
    { id: "safety", label: "Safety concern" },
    { id: "other", label: "Other" },
  ];

  const userReportReasons = [
    { id: "harassment", label: "Harassment or bullying" },
    { id: "inappropriate_content", label: "Inappropriate profile" },
    { id: "fake_profile", label: "Fake profile" },
    { id: "no_show", label: "Repeatedly no-shows" },
    { id: "spam", label: "Spam or scam" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Session Details" />

      <div className="flex-1 overflow-auto pb-32">
        {/* Header */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${sport?.color}20`, color: sport?.color }}
            >
              <Icon name={activity.sport} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-title-3 font-semibold">{sport?.name}</h1>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-caption-1 font-medium capitalize"
                style={{ backgroundColor: `${sport?.color}20`, color: sport?.color }}
              >
                {activity.level}
              </span>
            </div>
          </div>

          <p className="text-body text-ios-gray">{activity.description}</p>
        </div>

        {/* Details */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center gap-3 py-2 border-b border-ios-gray5">
            <MapPinIcon className="w-5 h-5 text-ios-gray" />
            <div>
              <div className="text-body font-medium">{activity.venue}</div>
              <div className="text-caption-1 text-ios-gray">{district?.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-ios-gray5">
            <ClockIcon className="w-5 h-5 text-ios-gray" />
            <div>
              <div className="text-body font-medium">{formatDate(activity.date)}</div>
              <div className="text-caption-1 text-ios-gray">{activity.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2">
            <UsersIcon className="w-5 h-5 text-ios-gray" />
            <div>
              <div className="text-body font-medium">
                {activity.currentPlayers.length}/{activity.maxPlayers} Players
              </div>
              <div className="text-caption-1 text-ios-gray">
                {activity.maxPlayers - activity.currentPlayers.length} spots left
              </div>
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="bg-white p-4 mb-2">
          <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-3">
            Players
          </h3>
          <div className="flex flex-wrap gap-4">
            {players.map((player) => {
              if (!player) return null;
              const isHost = player.id === activity.hostId;
              const canKeepInTouch = isPast && player.id !== "current";

              return (
                <div key={player.id} className="flex flex-col items-center gap-1 min-w-[56px]">
                  <div className="w-12 h-12 rounded-full bg-ios-gray5 flex items-center justify-center overflow-hidden">
                    {player.photo || player.photos?.[0] ? (
                      <img
                        src={player.photo || player.photos?.[0]}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-subheadline font-semibold text-ios-gray">
                        {player.initials}
                      </span>
                    )}
                  </div>
                  <span className="text-caption-1 text-center">
                    {player.name.split(" ")[0]}
                    {isHost && "*"}
                  </span>
                  {canKeepInTouch && (
                    <button
                      onClick={() => handleKeepInTouch(player.id)}
                      className={`text-caption-2 px-2 py-0.5 rounded-full ${
                        getConnectionStatus(player.id) === "connected"
                          ? "bg-ios-green/10 text-ios-green"
                          : getConnectionStatus(player.id) === "pending_sent"
                          ? "bg-ios-gray5 text-ios-gray"
                          : "bg-ios-blue/10 text-ios-blue"
                      }`}
                    >
                      {getKeepInTouchLabel(player.id)}
                    </button>
                  )}
                  {isPast && player.id !== "current" && (
                    <button
                      onClick={() => openReportUser(player.id, player.name)}
                      className="text-caption-2 text-ios-gray2"
                    >
                      Report
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-caption-1 text-ios-gray2 mt-3">* = Host</p>
        </div>

        {/* Host Info */}
        {host && (
          <div className="bg-white p-4 mb-2">
            <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-3">
              Hosted By
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ios-gray5 flex items-center justify-center overflow-hidden">
                {host.photo || host.photos?.[0] ? (
                  <img
                    src={host.photo || host.photos?.[0]}
                    alt={host.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-subheadline font-semibold text-ios-gray">
                    {host.initials}
                  </span>
                )}
              </div>
              <div>
                <div className="text-body font-medium">{host.name}</div>
                <div className="text-caption-1 text-ios-gray capitalize">
                  {host.level?.[activity.sport] || "Player"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Link - only for past sessions */}
        {isPast && (
          <div className="px-4 py-3">
            <button
              onClick={openReportSession}
              className="flex items-center gap-2 text-ios-gray text-caption-1"
            >
              <FlagIcon className="w-4 h-4" />
              Report this session
            </button>
          </div>
        )}
      </div>

      {/* Action Button */}
      {!isPast && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-ios-gray5">
          {isJoined ? (
            <button
              onClick={handleLeave}
              className="w-full py-3.5 bg-ios-gray5 text-ios-label font-semibold rounded-ios active:bg-ios-gray4"
            >
              Leave Session
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isFull}
              className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios active:bg-ios-blue-pressed disabled:opacity-50"
            >
              {isFull ? "Session Full" : "Join Session"}
            </button>
          )}
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-4 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-headline font-semibold">
                {reportType === "session" ? "Report Session" : `Report ${reportTargetName}`}
              </h3>
              <button
                onClick={closeReportModal}
                className="text-ios-blue font-medium"
              >
                Cancel
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {(reportType === "session" ? sessionReportReasons : userReportReasons).map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setReportReason(reason.id)}
                  className={`p-3 rounded-ios text-left ${
                    reportReason === reason.id
                      ? "bg-ios-blue/10 border-2 border-ios-blue"
                      : "bg-ios-gray6 border-2 border-transparent"
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>

            {reportReason === "other" && (
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Please describe the issue..."
                className="w-full p-3 bg-ios-gray6 rounded-ios mb-4 resize-none"
                rows={3}
              />
            )}

            <button
              onClick={closeReportModal}
              disabled={!reportReason}
              className="w-full py-3.5 bg-ios-red text-white font-semibold rounded-ios disabled:opacity-50"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
