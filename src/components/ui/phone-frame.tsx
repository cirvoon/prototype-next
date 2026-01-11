"use client";

import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[47px] shadow-2xl overflow-hidden border-[14px] border-black" style={{ transform: "translateZ(0)" }}>
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-[54px] flex items-end justify-between px-8 pb-2 z-50">
          <span className="text-sm font-semibold">{time}</span>
          <div className="flex items-center gap-1">
            {/* Signal */}
            <svg viewBox="0 0 18 12" fill="currentColor" className="w-4 h-3">
              <path d="M1 4.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v7c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-7zm4-2c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v9c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-9zm4-2c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v11c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5V.5zm4 3c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v8c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-8z" />
            </svg>
            {/* WiFi */}
            <svg viewBox="0 0 16 12" fill="currentColor" className="w-4 h-3">
              <path d="M8 2c3.5 0 6.4 2.2 7.6 5.3.1.2.1.5 0 .7C14.4 10.8 11.5 13 8 13s-6.4-2.2-7.6-5.3c-.1-.2-.1-.5 0-.7C1.6 4.2 4.5 2 8 2z" />
            </svg>
            {/* Battery */}
            <svg viewBox="0 0 25 12" fill="currentColor" className="w-6 h-3">
              <rect x="0" y="0" width="22" height="12" rx="3" stroke="currentColor" fill="none" strokeWidth="1" />
              <rect x="23" y="3.5" width="2" height="5" rx="1" fill="currentColor" />
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-50" />

        {/* Content */}
        <div className="absolute inset-0 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
