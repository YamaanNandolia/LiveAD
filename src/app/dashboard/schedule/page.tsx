import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { doctorTheme } from "@/lib/theme/doctor";
import { DoctorDashboardHeader } from "@/components/doctor-dashboard-header";

export default function SchedulePage() {
  return (
    <div className={`p-8 space-y-6 h-full ${doctorTheme.background}`}>
      <DoctorDashboardHeader
        title="Schedule"
        description="Plan your workouts and health activities"
      />

      <Card
        className={`
          ${doctorTheme.cardBg}
          ${doctorTheme.cardBorder}
          border
          rounded-xl
          shadow-sm
        `}
      >
        <CardHeader className="space-y-1 pb-3">
          <CardTitle
            className={`
              text-base
              font-semibold
              ${doctorTheme.textMain}
            `}
          >
            Weekly Schedule
          </CardTitle>
          <CardDescription className={doctorTheme.textMuted}>
            Organize your fitness routine throughout the week
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p
            className={`
              text-sm
              ${doctorTheme.textMuted}
            `}
          >
            Schedule management features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
