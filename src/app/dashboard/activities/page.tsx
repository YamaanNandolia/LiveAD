import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DoctorDashboardHeader } from "@/components/doctor-dashboard-header";
import { doctorTheme } from "@/lib/theme/doctor";

export default function ActivitiesPage() {
  return (
    <div className={`p-8 space-y-6 h-full ${doctorTheme.background}`}>
      <DoctorDashboardHeader
        title="Activities"
        description="Track and manage your fitness activities"
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
            Activity Log
          </CardTitle>
          <CardDescription className={doctorTheme.textMuted}>
            Your recent workout and exercise sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p
            className={`
              text-sm
              ${doctorTheme.textMuted}
            `}
          >
            Activity tracking features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
