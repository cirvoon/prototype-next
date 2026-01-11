"use client";

import { useState } from "react";
import { NavBar } from "@/components/ui/nav-bar";
import { useApp } from "@/context/app-context";
import { UsersIcon, CheckIcon, XIcon, HeartIcon } from "@/components/icons";

export default function ConnectionsPage() {
  const [tab, setTab] = useState<"connections" | "pending">("connections");
  const {
    connections,
    keepInTouchRequests,
    getUser,
    acceptKeepInTouchRequest,
    declineKeepInTouchRequest,
  } = useApp();

  const pendingReceived = keepInTouchRequests.filter(
    (r) => r.toUserId === "current" && r.status === "pending"
  );
  const pendingSent = keepInTouchRequests.filter(
    (r) => r.fromUserId === "current" && r.status === "pending"
  );

  return (
    <div className="h-full bg-ios-gray6 flex flex-col">
      <NavBar title="Connections" />

      <div className="flex-1 overflow-auto pb-8">
        {/* Tabs */}
        <div className="flex gap-2 px-4 py-3">
          <button
            onClick={() => setTab("connections")}
            className={`flex-1 py-2 px-4 rounded-full text-subheadline font-medium transition-colors ${
              tab === "connections"
                ? "bg-ios-blue text-white"
                : "bg-ios-gray5 text-ios-gray"
            }`}
          >
            Connections
            {connections.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-caption-2">
                {connections.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("pending")}
            className={`flex-1 py-2 px-4 rounded-full text-subheadline font-medium transition-colors ${
              tab === "pending"
                ? "bg-ios-blue text-white"
                : "bg-ios-gray5 text-ios-gray"
            }`}
          >
            Pending
            {pendingReceived.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-ios-red rounded-full text-caption-2 text-white">
                {pendingReceived.length}
              </span>
            )}
          </button>
        </div>

        {tab === "connections" && (
          <div className="px-4">
            {connections.length > 0 ? (
              <div className="bg-white rounded-ios-lg overflow-hidden">
                {connections.map((connection, index) => {
                  const userId =
                    connection.user1Id === "current"
                      ? connection.user2Id
                      : connection.user1Id;
                  const user = getUser(userId);
                  if (!user) return null;

                  return (
                    <div
                      key={connection.id}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        index < connections.length - 1
                          ? "border-b border-ios-gray5"
                          : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-ios-gray5 flex items-center justify-center overflow-hidden">
                        {user.photo || user.photos?.[0] ? (
                          <img
                            src={user.photo || user.photos?.[0]}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-subheadline font-semibold text-ios-gray">
                            {user.initials}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-body font-medium">{user.name}</div>
                        <div className="text-caption-1 text-ios-gray">
                          Connected
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-ios-blue/10 text-ios-blue text-caption-1 font-medium rounded-full">
                        Invite
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 text-ios-gray3 mb-4">
                  <UsersIcon className="w-full h-full" />
                </div>
                <h3 className="text-headline font-semibold mb-2">
                  No Connections Yet
                </h3>
                <p className="text-subheadline text-ios-gray">
                  Play sessions to meet new players and keep in touch!
                </p>
              </div>
            )}
          </div>
        )}

        {tab === "pending" && (
          <div className="px-4">
            {/* Received Requests */}
            {pendingReceived.length > 0 && (
              <div className="mb-4">
                <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2 px-1">
                  Requests for You
                </h3>
                <div className="bg-white rounded-ios-lg overflow-hidden">
                  {pendingReceived.map((request, index) => {
                    const user = getUser(request.fromUserId);
                    if (!user) return null;

                    return (
                      <div
                        key={request.id}
                        className={`flex items-center gap-3 px-4 py-3 ${
                          index < pendingReceived.length - 1
                            ? "border-b border-ios-gray5"
                            : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-ios-gray5 flex items-center justify-center overflow-hidden">
                          {user.photo || user.photos?.[0] ? (
                            <img
                              src={user.photo || user.photos?.[0]}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-subheadline font-semibold text-ios-gray">
                              {user.initials}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-body font-medium">{user.name}</div>
                          <div className="text-caption-1 text-ios-gray">
                            Wants to keep in touch
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => acceptKeepInTouchRequest(user.id)}
                            className="w-9 h-9 bg-ios-green text-white rounded-full flex items-center justify-center"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => declineKeepInTouchRequest(user.id)}
                            className="w-9 h-9 bg-ios-gray5 text-ios-gray rounded-full flex items-center justify-center"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sent Requests */}
            {pendingSent.length > 0 && (
              <div>
                <h3 className="text-footnote font-semibold text-ios-gray uppercase tracking-wide mb-2 px-1">
                  Sent Requests
                </h3>
                <div className="bg-white rounded-ios-lg overflow-hidden">
                  {pendingSent.map((request, index) => {
                    const user = getUser(request.toUserId);
                    if (!user) return null;

                    return (
                      <div
                        key={request.id}
                        className={`flex items-center gap-3 px-4 py-3 ${
                          index < pendingSent.length - 1
                            ? "border-b border-ios-gray5"
                            : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-ios-gray5 flex items-center justify-center overflow-hidden">
                          {user.photo || user.photos?.[0] ? (
                            <img
                              src={user.photo || user.photos?.[0]}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-subheadline font-semibold text-ios-gray">
                              {user.initials}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-body font-medium">{user.name}</div>
                          <div className="text-caption-1 text-ios-gray">
                            Awaiting response
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-ios-gray5 text-ios-gray text-caption-1 font-medium rounded-full">
                          Pending
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {pendingReceived.length === 0 && pendingSent.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 text-ios-gray3 mb-4">
                  <HeartIcon className="w-full h-full" />
                </div>
                <h3 className="text-headline font-semibold mb-2">
                  No Pending Requests
                </h3>
                <p className="text-subheadline text-ios-gray">
                  Send a "Keep in Touch" request after playing together!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
