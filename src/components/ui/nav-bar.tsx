"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, BellIcon } from "@/components/icons";
import { useApp } from "@/context/app-context";

interface NavBarProps {
  title: string;
  showBack?: boolean;
  largeTitle?: boolean;
  showNotification?: boolean;
  backHref?: string;
}

export function NavBar({
  title,
  showBack = true,
  largeTitle = false,
  showNotification = false,
  backHref,
}: NavBarProps) {
  const router = useRouter();
  const { unreadCount } = useApp();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  if (largeTitle) {
    return (
      <div className="sticky top-0 z-40 bg-ios-gray6 pt-[54px]">
        <div className="flex items-start justify-between px-5 pb-4 pt-2">
          <h1 className="text-large-title font-bold tracking-tight">{title}</h1>
          {showNotification && (
            <Link href="/notifications" className="relative p-2 -mr-2">
              <BellIcon className="w-6 h-6 text-ios-blue" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-ios-red text-white text-[11px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-ios-gray6">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-black/10 pt-[54px]">
      <div className="flex items-center justify-between h-11 px-4">
        {showBack ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-ios-blue min-w-[44px] min-h-[44px] -ml-4 px-4 active:opacity-30"
          >
            <ChevronLeftIcon className="w-3 h-3" />
            <span>Back</span>
          </button>
        ) : (
          <div className="min-w-[44px]" />
        )}
        <h1 className="text-headline font-semibold tracking-tight">{title}</h1>
        {showNotification ? (
          <Link href="/notifications" className="relative min-w-[44px] min-h-[44px] flex items-center justify-end">
            <BellIcon className="w-6 h-6 text-ios-blue" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-0 min-w-[18px] h-[18px] bg-ios-red text-white text-[11px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
        ) : (
          <div className="min-w-[44px]" />
        )}
      </div>
    </div>
  );
}
