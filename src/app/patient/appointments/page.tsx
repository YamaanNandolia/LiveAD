import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { patientTheme } from "@/lib/theme/patient";

export default function PatientAppointmentsPage() {
  return (
    <div className={`p-8 space-y-6 h-screen ${patientTheme.background}`}>
      <DashboardHeader
        title="My Appointments"
        description="Schedule and manage your appointments"
      />

      <div className="max-w-3xl space-y-4">
        <Card
          className={`
            ${patientTheme.cardBg}
            ${patientTheme.cardBorder}
            border
            shadow-sm
            rounded-xl
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
          `}
        >
          <CardHeader className="space-y-1 pb-3">
            <CardTitle
              className={`
                text-lg
                font-semibold
                tracking-tight
                ${patientTheme.brand}
              `}
            >
              My Appointments
            </CardTitle>
            <CardDescription
              className={`
                text-sm
                ${patientTheme.textMuted}
              `}
            >
              Stay on top of your upcoming visits
            </CardDescription>
          </CardHeader>

          <CardContent className="border-t pt-4 space-y-3">
            <div
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${patientTheme.badgeBg}
                ${patientTheme.badgeText}
              `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59E55]" />
              No upcoming appointments
            </div>

            <p
              className={`
                text-sm
                ${patientTheme.textSubtle}
              `}
            >
              You don&apos;t have any visits scheduled right now. When your
              doctor books a new appointment for you, it will appear here with
              the date, time, and location.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
