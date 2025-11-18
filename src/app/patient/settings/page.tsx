import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { patientTheme } from "@/lib/theme/patient";

export default async function PatientSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get patient data
  const { data: patient } = await supabase
    .from("patient")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className={`p-8 space-y-6 h-screen ${patientTheme.background}`}>
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <Card
        className={`
          ${patientTheme.cardBg}
          ${patientTheme.cardBorder}
          border
          rounded-xl
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-md
        `}
      >
        <CardHeader className="space-y-1 pb-3">
          <CardTitle
            className={`
              text-base
              font-semibold
              ${patientTheme.brand}
            `}
          >
            Account Information
          </CardTitle>
          <CardDescription className={patientTheme.textMuted}>
            Your personal details
          </CardDescription>
        </CardHeader>

        <CardContent
          className={`
            space-y-4
            border-t
            pt-4
            ${patientTheme.divider}
          `}
        >
          <div className="space-y-1">
            <p
              className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
            >
              Name
            </p>
            <p className={patientTheme.textMain}>
              {patient?.name || "Not set"}
            </p>
          </div>

          <div className="space-y-1">
            <p
              className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
            >
              Email
            </p>
            <p className={patientTheme.textMuted}>{patient?.email}</p>
          </div>

          {patient?.phone_number && (
            <div className="space-y-1">
              <p
                className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
              >
                Phone Number
              </p>
              <p className={patientTheme.textMuted}>{patient.phone_number}</p>
            </div>
          )}

          {patient?.date_of_birth && (
            <div className="space-y-1">
              <p
                className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
              >
                Date of Birth
              </p>
              <p className={patientTheme.textMuted}>
                {new Date(patient.date_of_birth).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-1">
            <p
              className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
            >
              Account Created
            </p>
            <p className={patientTheme.textMuted}>
              {patient?.created_at
                ? new Date(patient.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
