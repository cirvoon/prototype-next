"use client";

import Link from "next/link";
import { Activity } from "@/types";
import { ClockIcon, Icon } from "@/components/icons";
import { getDistrict, formatDate, getUser } from "@/data/mock-data";
import { useApp } from "@/context/app-context";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { currentUser } = useApp();
  const district = getDistrict(activity.district);
  const players = activity.currentPlayers.map((id) => getUser(id, currentUser)).filter(Boolean);

  const levelColors: Record<string, string> = {
    beginner: "bg-ios-green/10 text-ios-green",
    intermediate: "bg-ios-orange/10 text-ios-orange",
    advanced: "bg-ios-red/10 text-ios-red",
  };

  return (
    <Link
      href={`/session/${activity.id}`}
      className="block bg-white rounded-ios-lg p-4 shadow-ios active:bg-ios-gray6 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            activity.sport === "badminton" ? "bg-sport-badminton-bg text-sport-badminton" : "bg-sport-running-bg text-sport-running"
          }`}
        >
          <Icon name={activity.sport} className="w-5 h-5" />
        </div>
        <span className="font-semibold capitalize">{activity.sport}</span>
      </div>

      {/* Location */}
      <p className="text-subheadline text-ios-gray mb-2">
        {district?.name} - {activity.venue}
      </p>

      {/* Time */}
      <div className="flex items-center gap-1.5 text-ios-gray mb-3">
        <ClockIcon className="w-4 h-4" />
        <span className="text-subheadline">
          {formatDate(activity.date)} {activity.time}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Player Avatars */}
          <div className="flex -space-x-2">
            {players.slice(0, 3).map((player) => (
              <div
                key={player?.id}
                className="w-7 h-7 rounded-full bg-ios-gray5 flex items-center justify-center text-xs font-semibold text-ios-gray border-2 border-white"
              >
                {player?.initials}
              </div>
            ))}
            {players.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-ios-gray5 flex items-center justify-center text-xs font-semibold text-ios-gray border-2 border-white">
                +{players.length - 3}
              </div>
            )}
          </div>
          <span className="text-subheadline">
            <strong>
              {activity.currentPlayers.length}/{activity.maxPlayers}
            </strong>
          </span>
        </div>

        {/* Level Badge */}
        <span className={`px-2 py-0.5 rounded-full text-caption-1 font-medium capitalize ${levelColors[activity.level]}`}>
          {activity.level}
        </span>
      </div>
    </Link>
  );
}
