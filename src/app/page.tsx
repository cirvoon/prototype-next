"use client";

import Link from "next/link";
import { NavBar } from "@/components/ui/nav-bar";
import { TabBar } from "@/components/ui/tab-bar";
import { ActivityCard } from "@/components/ui/activity-card";
import { Icon } from "@/components/icons";
import { useApp } from "@/context/app-context";

export default function HomePage() {
  const { activities, currentUser } = useApp();
  const todayActivities = activities.filter((a) => a.date === "today").slice(0, 2);

  // Check if onboarding is complete
  if (!currentUser.onboardingComplete) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Onboarding Welcome */}
        <div className="flex-1 flex flex-col px-6 pt-[80px] pb-10">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 text-ios-blue">
              <Icon name="badminton" className="w-full h-full" />
            </div>
            <h1 className="text-title-1 font-bold tracking-tight mb-2">Welcome to Cirvoon</h1>
            <p className="text-body text-ios-gray">Find people to play sports with in your city</p>
          </div>

          <div className="flex flex-col gap-4 py-8">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-ios-blue text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="users" className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-body font-semibold">Join Activities</strong>
                <p className="text-subheadline text-ios-gray">Find games happening near you</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-ios-blue text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="plus" className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-body font-semibold">Create Sessions</strong>
                <p className="text-subheadline text-ios-gray">Host your own games</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-ios-blue text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="heart" className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-body font-semibold">Keep in Touch</strong>
                <p className="text-subheadline text-ios-gray">Connect with players you enjoy</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <Link
              href="/onboarding/profile"
              className="block w-full py-3.5 bg-ios-blue text-white text-center font-semibold rounded-ios active:bg-ios-blue-pressed"
            >
              Get Started
            </Link>
            <p className="text-center text-footnote text-ios-gray mt-4">
              Already have an account?{" "}
              <button className="text-ios-blue">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Cirvoon" showBack={false} largeTitle showNotification />

      <div className="flex-1 overflow-auto pb-24">
        {/* Hero Section */}
        <div className="px-4 text-center mb-6">
          <h2 className="text-title-2 font-bold tracking-tight mb-1">
            Find People to Play With
          </h2>
          <p className="text-subheadline text-ios-gray">Choose a sport to get started</p>
        </div>

        {/* Sport Selection */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          <Link
            href="/location?sport=badminton"
            className="flex flex-col items-center gap-2 p-6 bg-white rounded-ios-lg shadow-ios active:bg-ios-gray6"
          >
            <div className="w-12 h-12 text-sport-badminton">
              <Icon name="badminton" className="w-full h-full" />
            </div>
            <span className="text-subheadline font-medium">Badminton</span>
          </Link>
          <Link
            href="/location?sport=running"
            className="flex flex-col items-center gap-2 p-6 bg-white rounded-ios-lg shadow-ios active:bg-ios-gray6"
          >
            <div className="w-12 h-12 text-sport-running">
              <Icon name="running" className="w-full h-full" />
            </div>
            <span className="text-subheadline font-medium">Running</span>
          </Link>
        </div>

        {/* Or Create */}
        <div className="px-4 text-center mb-6">
          <p className="text-subheadline text-ios-gray mb-4">or</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ios-gray5 text-ios-label rounded-ios font-semibold active:bg-ios-gray4"
          >
            <Icon name="plus" className="w-5 h-5" />
            Create New Activity
          </Link>
        </div>

        {/* Happening Today */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-headline font-semibold">Happening Today</h3>
            <Link href="/sessions" className="text-subheadline text-ios-blue">
              See All
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {todayActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
