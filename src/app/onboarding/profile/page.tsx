"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/app-context";
import { UserIcon, XIcon } from "@/components/icons";

export default function OnboardingProfilePage() {
  const router = useRouter();
  const { onboarding, updateOnboarding } = useApp();
  const [name, setName] = useState(onboarding.name);

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const colors = ["#007AFF", "#34C759", "#FF9500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initial = name ? name.charAt(0).toUpperCase() : "U";

    const photo = `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <rect fill="${randomColor}" width="120" height="120"/>
        <text x="60" y="70" text-anchor="middle" fill="white" font-size="48" font-family="system-ui">${initial}</text>
      </svg>
    `)}`;

    updateOnboarding({ photos: [photo] });
  };

  const handleRemovePhoto = () => {
    updateOnboarding({ photos: [] });
  };

  const handleContinue = () => {
    updateOnboarding({ name });
    router.push("/onboarding/sports");
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-[70px] pb-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1 bg-ios-gray5 rounded-full overflow-hidden">
            <div className="h-full bg-ios-blue rounded-full" style={{ width: "50%" }} />
          </div>
          <span className="text-caption-1 text-ios-gray whitespace-nowrap">Step 1 of 2</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-title-2 font-bold tracking-tight text-center mb-2">
            Create your profile
          </h1>
          <p className="text-subheadline text-ios-gray text-center mb-8">
            Let other players know who you are
          </p>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-subheadline font-medium text-ios-gray mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-ios-gray6 rounded-ios text-body placeholder:text-ios-gray3 focus:outline-none focus:ring-2 focus:ring-ios-blue"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-subheadline font-medium text-ios-gray mb-2">
              Profile Photo <span className="text-ios-gray3">(optional)</span>
            </label>
            {onboarding.photos[0] ? (
              <div className="relative w-[120px] h-[120px] mx-auto">
                <img
                  src={onboarding.photos[0]}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-0 right-0 w-7 h-7 bg-ios-red text-white rounded-full flex items-center justify-center border-2 border-white"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handlePhotoUpload}
                className="w-full p-6 bg-ios-gray6 border-2 border-dashed border-ios-gray3 rounded-ios-lg flex flex-col items-center gap-2 active:bg-ios-gray5"
              >
                <div className="w-12 h-12 text-ios-gray2">
                  <UserIcon className="w-full h-full" />
                </div>
                <span className="text-subheadline text-ios-gray">Add Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios active:bg-ios-blue-pressed disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
          <button
            onClick={() => router.back()}
            className="w-full py-3 text-ios-blue font-medium mt-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
