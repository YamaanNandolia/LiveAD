"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { processWithAparavi } from "@/app/actions/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Stethoscope, FileText } from "lucide-react";
import { patientTheme } from "@/lib/theme/patient";

export default function PatientRecordsPage() {
  const [sessions, setSessions] = useState<any>(null);

  useEffect(() => {
    async function fetchSessions() {
      const { sessions } = await processWithAparavi();
      setSessions(sessions?.data);
    }
    fetchSessions();
  }, []);

  return (
    <div className={`p-8 space-y-6 h-screen ${patientTheme.background}`}>
      <DashboardHeader
        title="My Medical Records"
        description="Ask about your sessions and documents"
      />

      {/* Sessions grid */}
      <div className="space-y-4">
        <h2
          className={`
            text-lg
            font-semibold
            tracking-tight
            ${patientTheme.brand}
          `}
        >
          My Sessions
        </h2>

        {(!sessions || sessions.length === 0) && (
          <p className={`text-sm ${patientTheme.textMuted}`}>
            You don&apos;t have any recorded sessions yet.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions?.map((session) => (
            <Card
              key={session.id}
              className={`
                ${patientTheme.cardBg}
                ${patientTheme.cardBorder}
                border
                rounded-xl
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                cursor-default
              `}
            >
              <CardHeader className="space-y-1 pb-3">
                <CardTitle
                  className={`
                    text-sm
                    font-semibold
                    ${patientTheme.textMain}
                  `}
                >
                  {session.summary || "Session summary unavailable"}
                </CardTitle>

                <CardDescription
                  className={`
                    flex
                    items-center
                    gap-2
                    text-xs
                    ${patientTheme.textSubtle}
                  `}
                >
                  <Calendar className={`h-3 w-3 ${patientTheme.brandSoft}`} />
                  <span>
                    {session.created_at
                      ? new Date(session.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "No date available"}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-1">
                {/* Transcript preview */}
                {session.transcript && (
                  <div className="space-y-1">
                    <p
                      className={`
                        text-xs
                        font-medium
                        flex
                        items-center
                        gap-1
                        ${patientTheme.textSubtle}
                      `}
                    >
                      <FileText
                        className={`h-3 w-3 ${patientTheme.brandSoft}`}
                      />
                      Transcript
                    </p>
                    <p
                      className={`
                        text-sm
                        line-clamp-3
                        ${patientTheme.textMuted}
                      `}
                    >
                      {session.transcript}
                    </p>
                  </div>
                )}

                {/* Status & type */}
                <div
                  className={`
                    flex
                    items-center
                    justify-between
                    text-xs
                    ${patientTheme.textSubtle}
                  `}
                >
                  <span className="flex items-center gap-1">
                    <Stethoscope
                      className={`h-3 w-3 ${patientTheme.brandSoft}`}
                    />
                    {session.ended_at ? "Completed" : "In progress"}
                  </span>
                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      uppercase
                      tracking-wide
                      ${patientTheme.badgeBg}
                      ${patientTheme.badgeText}
                    `}
                  >
                    Session
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
