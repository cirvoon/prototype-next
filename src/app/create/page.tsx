"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/nav-bar";
import { Icon, MapPinIcon, ClockIcon, UsersIcon, CheckIcon } from "@/components/icons";
import { sports, locations, timeSlots, levels } from "@/data/mock-data";

type Step = "sport" | "location" | "datetime" | "details" | "confirm";

interface ActivityForm {
  sport: string;
  district: string;
  venue: string;
  date: string;
  time: string;
  level: string;
  maxPlayers: number;
  description: string;
}

function CreateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSport = searchParams.get("sport") || "";
  const initialDistrict = searchParams.get("district") || "";

  const [step, setStep] = useState<Step>(initialSport ? (initialDistrict ? "datetime" : "location") : "sport");
  const [form, setForm] = useState<ActivityForm>({
    sport: initialSport,
    district: initialDistrict,
    venue: "",
    date: "today",
    time: "",
    level: "intermediate",
    maxPlayers: 4,
    description: "",
  });

  const selectedSport = sports.find((s) => s.id === form.sport);
  const selectedDistrict = locations.districts.find((d) => d.id === form.district);

  const handleSelectSport = (sportId: string) => {
    setForm({ ...form, sport: sportId });
    setStep("location");
  };

  const handleSelectDistrict = (districtId: string) => {
    setForm({ ...form, district: districtId });
    setStep("datetime");
  };

  const handleSelectVenue = (venue: string) => {
    setForm({ ...form, venue });
  };

  const handleSelectTime = (time: string) => {
    setForm({ ...form, time });
  };

  const handleContinue = () => {
    if (step === "datetime" && form.time) {
      setStep("details");
    } else if (step === "details") {
      setStep("confirm");
    }
  };

  const handleCreate = () => {
    // In a real app, this would create the activity
    router.push("/activities");
  };

  const renderStep = () => {
    switch (step) {
      case "sport":
        return (
          <div className="px-4 py-4">
            <h2 className="text-title-3 font-bold mb-4">What do you want to play?</h2>
            <div className="flex flex-col gap-3">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSelectSport(sport.id)}
                  className="flex items-center gap-4 p-4 bg-white rounded-ios-lg active:bg-ios-gray6"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${sport.color}20`, color: sport.color }}
                  >
                    <Icon name={sport.id} className="w-6 h-6" />
                  </div>
                  <span className="text-body font-medium">{sport.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div className="px-4 py-4">
            <h2 className="text-title-3 font-bold mb-4">Where do you want to play?</h2>
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
                </button>
              ))}
            </div>
          </div>
        );

      case "datetime":
        return (
          <div className="px-4 py-4">
            <h2 className="text-title-3 font-bold mb-4">When & Where?</h2>

            {/* Venue Selection */}
            {selectedDistrict && (
              <div className="mb-6">
                <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                  Select Venue
                </h3>
                <div className="bg-white rounded-ios-lg overflow-hidden">
                  {selectedDistrict.venues.map((venue, index) => (
                    <button
                      key={venue}
                      onClick={() => handleSelectVenue(venue)}
                      className={`w-full flex items-center gap-3 px-4 py-3 ${
                        index < selectedDistrict.venues.length - 1 ? "border-b border-ios-gray5" : ""
                      } ${form.venue === venue ? "bg-ios-blue/5" : ""}`}
                    >
                      <MapPinIcon className="w-5 h-5 text-ios-gray" />
                      <span className="flex-1 text-left">{venue}</span>
                      {form.venue === venue && (
                        <CheckIcon className="w-5 h-5 text-ios-blue" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                Date
              </h3>
              <div className="flex gap-2">
                {["today", "tomorrow"].map((date) => (
                  <button
                    key={date}
                    onClick={() => setForm({ ...form, date })}
                    className={`flex-1 py-3 rounded-ios text-subheadline font-medium capitalize ${
                      form.date === date
                        ? "bg-ios-blue text-white"
                        : "bg-ios-gray5 text-ios-gray"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                Time
              </h3>
              <div className="bg-white rounded-ios-lg p-4">
                <div className="mb-3">
                  <span className="text-caption-1 text-ios-gray">Morning</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {timeSlots.morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSelectTime(time)}
                        className={`px-3 py-2 rounded-ios text-caption-1 font-medium ${
                          form.time === time
                            ? "bg-ios-blue text-white"
                            : "bg-ios-gray6 text-ios-gray"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-caption-1 text-ios-gray">Afternoon</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {timeSlots.afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSelectTime(time)}
                        className={`px-3 py-2 rounded-ios text-caption-1 font-medium ${
                          form.time === time
                            ? "bg-ios-blue text-white"
                            : "bg-ios-gray6 text-ios-gray"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-caption-1 text-ios-gray">Evening</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {timeSlots.evening.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSelectTime(time)}
                        className={`px-3 py-2 rounded-ios text-caption-1 font-medium ${
                          form.time === time
                            ? "bg-ios-blue text-white"
                            : "bg-ios-gray6 text-ios-gray"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!form.venue || !form.time}
              className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case "details":
        return (
          <div className="px-4 py-4">
            <h2 className="text-title-3 font-bold mb-4">Session Details</h2>

            {/* Level */}
            <div className="mb-6">
              <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                Skill Level
              </h3>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setForm({ ...form, level: level.id })}
                    className={`flex-1 py-3 rounded-ios text-caption-1 font-medium ${
                      form.level === level.id
                        ? "bg-ios-blue text-white"
                        : "bg-ios-gray5 text-ios-gray"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Players */}
            <div className="mb-6">
              <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                Max Players
              </h3>
              <div className="flex gap-2">
                {[2, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setForm({ ...form, maxPlayers: num })}
                    className={`flex-1 py-3 rounded-ios text-subheadline font-medium ${
                      form.maxPlayers === num
                        ? "bg-ios-blue text-white"
                        : "bg-ios-gray5 text-ios-gray"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2">
                Description (Optional)
              </h3>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Tell others about your session..."
                className="w-full p-3 bg-white rounded-ios resize-none border border-ios-gray4"
                rows={3}
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios"
            >
              Review Session
            </button>
          </div>
        );

      case "confirm":
        return (
          <div className="px-4 py-4">
            <h2 className="text-title-3 font-bold mb-4">Review Your Session</h2>

            <div className="bg-white rounded-ios-lg p-4 mb-6">
              {/* Sport */}
              <div className="flex items-center gap-3 pb-3 border-b border-ios-gray5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedSport?.color}20`, color: selectedSport?.color }}
                >
                  <Icon name={form.sport} className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-body font-semibold">{selectedSport?.name}</div>
                  <div
                    className="inline-block px-2 py-0.5 rounded-full text-caption-1 font-medium capitalize"
                    style={{ backgroundColor: `${selectedSport?.color}20`, color: selectedSport?.color }}
                  >
                    {form.level}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 py-3 border-b border-ios-gray5">
                <MapPinIcon className="w-5 h-5 text-ios-gray" />
                <div>
                  <div className="text-body">{form.venue}</div>
                  <div className="text-caption-1 text-ios-gray">{selectedDistrict?.name}</div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 py-3 border-b border-ios-gray5">
                <ClockIcon className="w-5 h-5 text-ios-gray" />
                <div>
                  <div className="text-body capitalize">{form.date}</div>
                  <div className="text-caption-1 text-ios-gray">{form.time}</div>
                </div>
              </div>

              {/* Players */}
              <div className="flex items-center gap-3 pt-3">
                <UsersIcon className="w-5 h-5 text-ios-gray" />
                <div className="text-body">Up to {form.maxPlayers} players</div>
              </div>
            </div>

            {form.description && (
              <div className="bg-white rounded-ios-lg p-4 mb-6">
                <div className="text-caption-1 text-ios-gray mb-1">Description</div>
                <div className="text-body">{form.description}</div>
              </div>
            )}

            <button
              onClick={handleCreate}
              className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios"
            >
              Create Session
            </button>
          </div>
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "sport":
        return "Create Session";
      case "location":
        return "Location";
      case "datetime":
        return "When & Where";
      case "details":
        return "Details";
      case "confirm":
        return "Confirm";
    }
  };

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title={getStepTitle()} />

      <div className="flex-1 overflow-auto pb-8">
        {/* Progress */}
        <div className="px-4 py-3">
          <div className="flex gap-1">
            {["sport", "location", "datetime", "details", "confirm"].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  ["sport", "location", "datetime", "details", "confirm"].indexOf(step) >= i
                    ? "bg-ios-blue"
                    : "bg-ios-gray5"
                }`}
              />
            ))}
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="h-full bg-ios-gray6" />}>
      <CreateContent />
    </Suspense>
  );
}
