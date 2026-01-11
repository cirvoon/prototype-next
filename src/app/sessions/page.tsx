"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { NavBar } from "@/components/ui/nav-bar";
import { ActivityCard } from "@/components/ui/activity-card";
import { useApp } from "@/context/app-context";
import { sports, getDistrict } from "@/data/mock-data";
import { Icon, CalendarIcon, PlusIcon } from "@/components/icons";

function SessionsContent() {
  const searchParams = useSearchParams();
  const { activities } = useApp();

  const sport = searchParams.get("sport");
  const district = searchParams.get("district");

  const filteredActivities = activities.filter((activity) => {
    if (sport && activity.sport !== sport) return false;
    if (district && activity.district !== district) return false;
    return activity.date !== "past";
  });

  const sportData = sport ? sports.find((s) => s.id === sport) : null;
  const districtData = district ? getDistrict(district) : null;

  const title = sportData
    ? districtData
      ? `${sportData.name} in ${districtData.name}`
      : sportData.name
    : "All Sessions";

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Available Sessions" />

      <div className="flex-1 overflow-auto pb-8">
        {/* Filter Info */}
        <div className="px-4 py-3 flex items-center gap-2 flex-wrap">
          {sportData && (
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-caption-1 font-medium"
              style={{ backgroundColor: `${sportData.color}20`, color: sportData.color }}
            >
              <Icon name={sportData.id} className="w-4 h-4" />
              {sportData.name}
            </span>
          )}
          {districtData && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-caption-1 font-medium bg-ios-gray5 text-ios-gray">
              {districtData.name}
            </span>
          )}
        </div>

        {/* Sessions List */}
        <div className="px-4">
          {filteredActivities.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 text-ios-gray3 mb-4">
                <CalendarIcon className="w-full h-full" />
              </div>
              <h3 className="text-headline font-semibold mb-2">No Sessions Available</h3>
              <p className="text-subheadline text-ios-gray mb-6">
                Be the first to create a session!
              </p>
              <Link
                href={`/create${sport ? `?sport=${sport}` : ""}${
                  district ? `&district=${district}` : ""
                }`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ios-blue text-white rounded-ios font-semibold"
              >
                <PlusIcon className="w-5 h-5" />
                Create Session
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={<div className="h-full bg-ios-gray6" />}>
      <SessionsContent />
    </Suspense>
  );
}
