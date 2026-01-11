"use client";

import Link from "next/link";
import { NavBar } from "@/components/ui/nav-bar";
import { TabBar } from "@/components/ui/tab-bar";
import { useApp } from "@/context/app-context";
import { UserIcon, UsersIcon, HeartIcon, ActivityIcon, ChevronRightIcon } from "@/components/icons";

export default function ProfilePage() {
  const { currentUser, joinedActivities, pastActivities, connections } = useApp();
  const totalActivities = joinedActivities.length + pastActivities.length;

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Profile" showBack={false} largeTitle showNotification />

      <div className="flex-1 overflow-auto pb-24">
        {/* Profile Header */}
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-ios-gray5 flex items-center justify-center mb-3 overflow-hidden">
            {currentUser.photos?.[0] ? (
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-ios-gray">
                {currentUser.initials || "U"}
              </span>
            )}
          </div>
          <h2 className="text-title-3 font-semibold">{currentUser.name || "Guest"}</h2>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 px-4 py-4 bg-white mx-4 rounded-ios-lg mb-4">
          <div className="text-center">
            <span className="block text-title-2 font-bold">{totalActivities}</span>
            <span className="text-caption-1 text-ios-gray">Activities</span>
          </div>
          <div className="text-center">
            <span className="block text-title-2 font-bold">{pastActivities.length}</span>
            <span className="text-caption-1 text-ios-gray">Completed</span>
          </div>
          <div className="text-center">
            <span className="block text-title-2 font-bold">{currentUser.photos?.length || 0}</span>
            <span className="text-caption-1 text-ios-gray">Photos</span>
          </div>
        </div>

        {/* Skill Levels */}
        {Object.keys(currentUser.level || {}).length > 0 && (
          <div className="mx-4 mb-4">
            <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2 px-1">
              Skill Levels
            </h3>
            <div className="bg-white rounded-ios-lg p-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentUser.level).map(([sport, level]) => (
                  <span
                    key={sport}
                    className={`px-3 py-1 rounded-full text-caption-1 font-medium capitalize ${
                      level === "beginner"
                        ? "bg-ios-green/10 text-ios-green"
                        : level === "intermediate"
                        ? "bg-ios-orange/10 text-ios-orange"
                        : "bg-ios-red/10 text-ios-red"
                    }`}
                  >
                    {sport}: {level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Menu */}
        <div className="mx-4 mb-4">
          <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2 px-1">
            Settings
          </h3>
          <div className="bg-white rounded-ios-lg overflow-hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 border-b border-ios-gray5 active:bg-ios-gray6">
              <UserIcon className="w-5 h-5 text-ios-blue" />
              <span className="flex-1 text-left">Edit Profile</span>
              <ChevronRightIcon className="w-4 h-4 text-ios-gray3" />
            </button>
            <Link
              href="/connections"
              className="w-full flex items-center gap-3 px-4 py-3 border-b border-ios-gray5 active:bg-ios-gray6"
            >
              <UsersIcon className="w-5 h-5 text-ios-blue" />
              <span className="flex-1 text-left">My Connections</span>
              {connections.length > 0 && (
                <span className="px-2 py-0.5 bg-ios-blue/10 text-ios-blue text-caption-1 font-medium rounded-full">
                  {connections.length}
                </span>
              )}
              <ChevronRightIcon className="w-4 h-4 text-ios-gray3" />
            </Link>
            <Link
              href="/enhance"
              className="w-full flex items-center gap-3 px-4 py-3 border-b border-ios-gray5 active:bg-ios-gray6"
            >
              <HeartIcon className="w-5 h-5 text-ios-blue" />
              <span className="flex-1 text-left">Enhance Account</span>
              <span className="px-2 py-0.5 bg-ios-green/10 text-ios-green text-caption-1 font-medium rounded-full">
                {currentUser.isEnhanced ? "Active" : "Try it"}
              </span>
              <ChevronRightIcon className="w-4 h-4 text-ios-gray3" />
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 active:bg-ios-gray6">
              <ActivityIcon className="w-5 h-5 text-ios-blue" />
              <span className="flex-1 text-left">Notifications</span>
              <ChevronRightIcon className="w-4 h-4 text-ios-gray3" />
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mx-4 mb-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-ios-gray5 text-ios-label font-medium rounded-ios active:bg-ios-gray4"
          >
            Reset & Start Over
          </button>
          <p className="text-center text-caption-1 text-ios-gray mt-2">
            This will restart the onboarding flow
          </p>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
