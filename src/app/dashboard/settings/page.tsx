import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DoctorProfileForm } from "@/components/doctor-profile-form";
import { getDoctorProfile } from "@/app/actions/doctor";
import { doctorTheme } from "@/lib/theme/doctor";
import { DoctorDashboardHeader } from "@/components/doctor-dashboard-header";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch doctor profile using server action
  const profileResult = await getDoctorProfile();
  const doctorProfile = profileResult.success ? profileResult.data : undefined;

  return (
    <div className={`p-8 space-y-6 h-full ${doctorTheme.background}`}>
      <DoctorDashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DoctorProfileForm initialData={doctorProfile} />

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
              Account Information
            </CardTitle>
            <CardDescription className={doctorTheme.textMuted}>
              Your authentication details
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className={`text-sm ${doctorTheme.textMuted}`}>
                {user?.email}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">User ID</p>
              <p
                className={`
                  text-xs
                  font-mono
                  ${doctorTheme.textSubtle}
                `}
              >
                {user?.id}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Account Created</p>
              <p className={`text-sm ${doctorTheme.textMuted}`}>
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {doctorProfile && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium">Profile Status</p>
                <p
                  className={`
                    text-sm
                    ${doctorTheme.statusPositiveText}
                  `}
                >
                  ✓ Profile Complete
                </p>
              </div>
            )}

            {!doctorProfile && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium">Profile Status</p>
                <p className="text-sm text-amber-600">
                  ⚠ Please complete your doctor profile
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
