"use client";

import { InvitePatientDialog } from "@/components/invite-patient-dialog";
import { patientTheme } from "@/lib/theme/patient";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  showInviteButton?: boolean;
}

export function DashboardHeader({
  title,
  description,
  showInviteButton = false,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className={`
            text-3xl
            font-bold
            tracking-tight
            ${patientTheme.textMain}
          `}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`
              text-sm
              mt-1
              ${patientTheme.textMuted}
            `}
          >
            {description}
          </p>
        )}
      </div>
      {showInviteButton && (
        <div
          className={`
            inline-flex
            items-center
            rounded-full
            border
            px-4
            py-2
            text-sm
            font-medium
            shadow-sm
            transition-colors
            duration-200
            ${patientTheme.brandAccentBg}
            ${patientTheme.brandAccentBorder}
            ${patientTheme.brand}
            hover:bg-[#FFE4CC]
          `}
        >
          <InvitePatientDialog />
        </div>
      )}
    </div>
  );
}
