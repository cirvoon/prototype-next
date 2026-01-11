"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { NavBar } from "@/components/ui/nav-bar";
import { locations } from "@/data/mock-data";
import { MapPinIcon, ChevronRightIcon } from "@/components/icons";

function LocationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sport = searchParams.get("sport") || "badminton";

  const handleSelectDistrict = (districtId: string) => {
    router.push(`/sessions?sport=${sport}&district=${districtId}`);
  };

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Select Location" />

      <div className="flex-1 overflow-auto pb-8">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="w-5 h-5 text-ios-blue" />
            <span className="text-headline font-semibold">{locations.city}</span>
          </div>

          <div className="bg-white rounded-ios-lg overflow-hidden">
            {locations.districts.map((district, index) => (
              <button
                key={district.id}
                onClick={() => handleSelectDistrict(district.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 active:bg-ios-gray6 ${
                  index < locations.districts.length - 1 ? "border-b border-ios-gray5" : ""
                }`}
              >
                <div className="w-10 h-10 bg-ios-blue/10 text-ios-blue rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-body font-medium">{district.name}</div>
                  <div className="text-caption-1 text-ios-gray">
                    {district.venues.length} venues
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-ios-gray3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense fallback={<div className="h-full bg-ios-gray6" />}>
      <LocationContent />
    </Suspense>
  );
}
