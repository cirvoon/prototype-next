"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, ActivityIcon, UserIcon } from "@/components/icons";

const tabs = [
  { id: "explore", href: "/", icon: SearchIcon, label: "Explore" },
  { id: "activities", href: "/activities", icon: ActivityIcon, label: "Activities" },
  { id: "profile", href: "/profile", icon: UserIcon, label: "Profile" },
];

export function TabBar() {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === "/" || pathname.startsWith("/location") || pathname.startsWith("/time") || pathname.startsWith("/sessions")) {
      return "explore";
    }
    if (pathname.startsWith("/activities")) return "activities";
    if (pathname.startsWith("/profile")) return "profile";
    return "explore";
  };

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-black/10 pb-8 z-40">
      <div className="flex justify-around items-center h-[50px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 ${
                isActive ? "text-ios-blue" : "text-ios-gray"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
