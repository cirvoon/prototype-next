"use client";

import { useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/nav-bar";
import { useApp } from "@/context/app-context";
import { SparklesIcon, UsersIcon, CalendarIcon, StarIcon, CheckIcon } from "@/components/icons";

export default function EnhanceAccountPage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useApp();

  const handleEnhance = () => {
    setCurrentUser({ ...currentUser, isEnhanced: true });
    router.back();
  };

  const features = [
    {
      icon: UsersIcon,
      title: "Unlimited Connections",
      description: "Keep in touch with as many players as you want",
    },
    {
      icon: CalendarIcon,
      title: "Priority Booking",
      description: "Get notified first when popular sessions open",
    },
    {
      icon: SparklesIcon,
      title: "Enhanced Profile",
      description: "Stand out with a verified badge on your profile",
    },
    {
      icon: StarIcon,
      title: "Premium Support",
      description: "Get help faster with priority customer support",
    },
  ];

  if (currentUser.isEnhanced) {
    return (
      <div className="h-full bg-ios-gray6 flex flex-col">
        <NavBar title="Enhanced Account" />

        <div className="flex-1 overflow-auto pb-8">
          <div className="flex flex-col items-center py-8 px-4">
            <div className="w-20 h-20 bg-ios-green/20 text-ios-green rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="w-10 h-10" />
            </div>
            <h2 className="text-title-2 font-bold mb-2">You're Enhanced!</h2>
            <p className="text-subheadline text-ios-gray text-center">
              Thank you for supporting Cirvoon. Enjoy all the premium features!
            </p>
          </div>

          <div className="px-4">
            <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2 px-1">
              Your Benefits
            </h3>
            <div className="bg-white rounded-ios-lg overflow-hidden">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      index < features.length - 1 ? "border-b border-ios-gray5" : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-ios-green/10 text-ios-green rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-body font-medium">{feature.title}</div>
                      <div className="text-caption-1 text-ios-gray">
                        {feature.description}
                      </div>
                    </div>
                    <CheckIcon className="w-5 h-5 text-ios-green" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <NavBar title="Enhance Account" />

      <div className="flex-1 overflow-auto pb-32">
        {/* Hero */}
        <div className="flex flex-col items-center py-8 px-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-ios-orange to-ios-red text-white rounded-2xl flex items-center justify-center mb-4">
            <SparklesIcon className="w-10 h-10" />
          </div>
          <h1 className="text-title-2 font-bold mb-2">Enhance Your Experience</h1>
          <p className="text-subheadline text-ios-gray">
            Unlock premium features and get more out of Cirvoon
          </p>
        </div>

        {/* Features */}
        <div className="px-4 mb-6">
          <div className="bg-ios-gray6 rounded-ios-lg overflow-hidden">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 px-4 py-4 ${
                    index < features.length - 1 ? "border-b border-ios-gray5" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-ios-blue/10 text-ios-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-body font-semibold">{feature.title}</div>
                    <div className="text-caption-1 text-ios-gray">
                      {feature.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="px-4">
          <div className="bg-gradient-to-br from-ios-blue to-ios-purple p-4 rounded-ios-lg text-white text-center">
            <div className="text-caption-1 mb-1">Enhanced Account</div>
            <div className="text-large-title font-bold mb-1">
              99,000<span className="text-body font-normal"> VND/mo</span>
            </div>
            <div className="text-caption-1 opacity-80">Cancel anytime</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-ios-gray5">
        <button
          onClick={handleEnhance}
          className="w-full py-3.5 bg-ios-blue text-white font-semibold rounded-ios active:bg-ios-blue-pressed"
        >
          Enhance Now
        </button>
        <p className="text-center text-caption-1 text-ios-gray mt-2">
          Free trial for 7 days, then 99,000 VND/month
        </p>
      </div>
    </div>
  );
}
