import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { PatientPendingForms } from "@/components/patient-pending-forms";
import { User, Phone, Calendar, Stethoscope } from "lucide-react";
import { patientTheme } from "@/lib/theme/patient";

export default async function PatientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get patient data with doctor info
  const { data: patient } = await supabase
    .from("patient")
    .select(
      `
      *,
      doctor:doctor_id (
        id,
        name,
        phone_number
      )
    `,
    )
    .eq("id", user?.id)
    .single();

  // Get pending forms
  const { data: forms } = await supabase
    .from("form")
    .select(
      `
      *,
      doctor:doctor_id(name)
    `,
    )
    .eq("patient_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className={`p-8 space-y-6 h-screen ${patientTheme.background}`}>
      <DashboardHeader
        title="My Dashboard"
        description={`Welcome back, ${patient?.name || user?.email}`}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Patient Info Card */}
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
                flex
                items-center
                gap-2
                text-base
                font-semibold
                ${patientTheme.brand}
              `}
            >
              <User className={`h-5 w-5 ${patientTheme.brandSoft}`} />
              My Information
            </CardTitle>
            <CardDescription className={patientTheme.textMuted}>
              Your personal details
            </CardDescription>
          </CardHeader>

          <CardContent
            className={`space-y-4 border-t pt-4 ${patientTheme.divider}`}
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
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Phone className={`h-4 w-4 ${patientTheme.brandSoft}`} />
                </div>
                <div className="space-y-1">
                  <p
                    className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
                  >
                    Phone
                  </p>
                  <p className={patientTheme.textMuted}>
                    {patient.phone_number}
                  </p>
                </div>
              </div>
            )}

            {patient?.date_of_birth && (
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Calendar className={`h-4 w-4 ${patientTheme.brandSoft}`} />
                </div>
                <div className="space-y-1">
                  <p
                    className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
                  >
                    Date of Birth
                  </p>
                  <p className={patientTheme.textMuted}>
                    {new Date(patient.date_of_birth).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Doctor Info Card */}
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
                flex
                items-center
                gap-2
                text-base
                font-semibold
                ${patientTheme.brand}
              `}
            >
              <Stethoscope className={`h-5 w-5 ${patientTheme.brandSoft}`} />
              My Doctor
            </CardTitle>
            <CardDescription className={patientTheme.textMuted}>
              Your assigned healthcare provider
            </CardDescription>
          </CardHeader>

          <CardContent
            className={`space-y-4 border-t pt-4 ${patientTheme.divider}`}
          >
            {patient?.doctor ? (
              <>
                <div className="space-y-1">
                  <p
                    className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
                  >
                    Doctor Name
                  </p>
                  <p className={patientTheme.textMain}>{patient.doctor.name}</p>
                </div>

                {patient.doctor.phone_number && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Phone className={`h-4 w-4 ${patientTheme.brandSoft}`} />
                    </div>
                    <div className="space-y-1">
                      <p
                        className={`text-xs font-semibold tracking-wide uppercase ${patientTheme.textSubtle}`}
                      >
                        Contact
                      </p>
                      <p className={patientTheme.textMuted}>
                        {patient.doctor.phone_number}
                      </p>
                    </div>
                  </div>
                )}

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
                  Primary care connection
                </div>
              </>
            ) : (
              <p className={patientTheme.textMuted}>No doctor assigned</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending Forms */}
      <PatientPendingForms forms={forms || []} />
    </div>
  );
}
