"use client";

import { useState } from "react";
import { NavBar } from "@/components/ui/nav-bar";
import { TabBar } from "@/components/ui/tab-bar";
import { ActivityCard } from "@/components/ui/activity-card";
import { useApp } from "@/context/app-context";
import { CalendarIcon, CheckIcon } from "@/components/icons";

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const { activities, joinedActivities, pastActivities } = useApp();

  const upcomingActivities = activities.filter((a) => joinedActivities.includes(a.id));

  const displayActivities = filter === "upcoming" ? upcomingActivities : pastActivities;

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="My Activities" showBack={false} largeTitle showNotification />

      <div className="flex-1 overflow-auto pb-24">
        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 mb-4">
          <button
            onClick={() => setFilter("upcoming")}
            className={`flex-1 py-2 px-4 rounded-full text-subheadline font-medium transition-colors ${
              filter === "upcoming"
                ? "bg-ios-blue text-white"
                : "bg-ios-gray5 text-ios-gray"
            }`}
          >
            Upcoming
            {upcomingActivities.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-caption-2">
                {upcomingActivities.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`flex-1 py-2 px-4 rounded-full text-subheadline font-medium transition-colors ${
              filter === "past"
                ? "bg-ios-blue text-white"
                : "bg-ios-gray5 text-ios-gray"
            }`}
          >
            Past
            {pastActivities.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-caption-2">
                {pastActivities.length}
              </span>
            )}
          </button>
        </div>

        {/* Activities List */}
        <div className="px-4">
          {displayActivities.length > 0 ? (
            <div className="flex flex-col gap-3">
              {displayActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 text-ios-gray3 mb-4">
                {filter === "upcoming" ? (
                  <CalendarIcon className="w-full h-full" />
                ) : (
                  <CheckIcon className="w-full h-full" />
                )}
              </div>
              <h3 className="text-headline font-semibold mb-2">
                {filter === "upcoming" ? "No Upcoming Activities" : "No Past Activities"}
              </h3>
              <p className="text-subheadline text-ios-gray">
                {filter === "upcoming"
                  ? "Find a game to join or create your own!"
                  : "Your completed sessions will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
