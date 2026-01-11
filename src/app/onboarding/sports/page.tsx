"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/app-context";
import { sports, levels } from "@/data/mock-data";
import { Icon, CheckIcon } from "@/components/icons";

export default function OnboardingSportsPage() {
  const router = useRouter();
  const { onboarding, updateOnboarding, completeOnboarding } = useApp();

  const toggleSport = (sportId: string) => {
    const isSelected = onboarding.selectedSports.includes(sportId);
    if (isSelected) {
      updateOnboarding({
        selectedSports: onboarding.selectedSports.filter((id) => id !== sportId),
        sportLevels: Object.fromEntries(
          Object.entries(onboarding.sportLevels).filter(([key]) => key !== sportId)
        ),
      });
    } else {
      updateOnboarding({
        selectedSports: [...onboarding.selectedSports, sportId],
        sportLevels: { ...onboarding.sportLevels, [sportId]: "beginner" },
      });
    }
  };

  const setLevel = (sportId: string, levelId: string) => {
    updateOnboarding({
      sportLevels: { ...onboarding.sportLevels, [sportId]: levelId },
    });
  };

  const handleComplete = () => {
    completeOnboarding();
    router.push("/");
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-[70px] pb-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1 bg-ios-gray5 rounded-full overflow-hidden">
            <div className="h-full bg-ios-blue rounded-full" style={{ width: "100%" }} />
          </div>
          <span className="text-caption-1 text-ios-gray whitespace-nowrap">Step 2 of 2</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <h1 className="text-title-2 font-bold tracking-tight text-center mb-2">
            What do you play?
          </h1>
          <p className="text-subheadline text-ios-gray text-center mb-8">
            Select sports and your skill level
          </p>

          {/* Sport Selection */}
          <div className="flex flex-col gap-3">
            {sports.map((sport) => {
              const isSelected = onboarding.selectedSports.includes(sport.id);
              return (
                <div
                  key={sport.id}
                  className={`border rounded-ios-lg overflow-hidden transition-colors ${
                    isSelected ? "border-ios-blue bg-ios-blue/5" : "border-ios-gray4 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleSport(sport.id)}
                    className="w-full flex items-center gap-3 p-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${sport.color}20`, color: sport.color }}
                    >
                      <Icon name={sport.id} className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left font-medium">{sport.name}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-ios-blue text-white" : "border-2 border-ios-gray3"
                      }`}
                    >
                      {isSelected && <CheckIcon className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Level Selector */}
                  {isSelected && (
                    <div className="px-4 pb-4 border-t border-ios-gray5">
                      <span className="block text-caption-1 text-ios-gray mt-3 mb-2">Your level:</span>
                      <div className="flex gap-2">
                        {levels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => setLevel(sport.id, level.id)}
                            className={`flex-1 py-2 px-3 rounded-ios text-caption-1 font-medium transition-colors ${
                              onboarding.sportLevels[sport.id] === level.id
                                ? "bg-ios-blue text-white"
                                : "bg-ios-gray5 text-ios-gray"
                            }`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleComplete}
            disabled={onboarding.selectedSports.length === 0}
            className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios active:bg-ios-blue-pressed disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Playing
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
