import { doctorTheme } from "@/lib/theme/doctor";
import { InvitePatientDialog } from "./invite-patient-dialog";

interface DoctorDashboardHeaderProps {
  title: string;
  description?: string;
  showInviteButton?: boolean;
}

export function DoctorDashboardHeader({
  title,
  description,
  showInviteButton = false,
}: DoctorDashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className={`
            text-3xl
            font-semibold
            tracking-tight
            ${doctorTheme.textMain}
          `}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`
              text-sm
              mt-1
              ${doctorTheme.textMuted}
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
            rounded-md
            border
            px-3
            py-1.5
            text-sm
            font-medium
            shadow-sm
            transition-colors
            duration-200
            ${doctorTheme.brandAccentBg}
            ${doctorTheme.brandAccentBorder}
            ${doctorTheme.brand}
            hover:bg-[#D8E5FF]
          `}
        >
          <InvitePatientDialog />
        </div>
      )}
    </div>
  );
}
