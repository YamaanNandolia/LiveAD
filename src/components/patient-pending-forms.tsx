"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { patientTheme } from "@/lib/theme/patient";

interface Form {
  id: string;
  title: string;
  created_at: string;
  submitted_at: string | null;
  doctor: {
    name: string;
  } | null;
}

interface PatientPendingFormsProps {
  forms: Form[];
}

export function PatientPendingForms({ forms }: PatientPendingFormsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (forms.length === 0) {
    return (
      <Card
        className={`
          ${patientTheme.cardBg}
          ${patientTheme.cardBorder}
          border
          rounded-xl
          shadow-sm
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
            <FileText className={`h-5 w-5 ${patientTheme.brandSoft}`} />
            Health Forms
          </CardTitle>
          <CardDescription className={patientTheme.textMuted}>
            Forms from your doctor
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center">
            <FileText
              className={`
                h-12
                w-12
                mx-auto
                mb-4
                ${patientTheme.textSubtle}
              `}
            />
            <p className={`text-sm ${patientTheme.textMuted}`}>
              No forms assigned yet
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingForms = forms.filter((f) => !f.submitted_at);
  const completedForms = forms.filter((f) => f.submitted_at);

  return (
    <div className="space-y-6">
      {/* Pending Forms */}
      {pendingForms.length > 0 && (
        <Card
          className={`
            ${patientTheme.cardBg}
            ${patientTheme.cardBorder}
            border
            rounded-xl
            shadow-sm
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
              <Clock className={`h-5 w-5 ${patientTheme.brandSoft}`} />
              Pending Forms
            </CardTitle>
            <CardDescription className={patientTheme.textMuted}>
              {pendingForms.length} form
              {pendingForms.length !== 1 ? "s" : ""} waiting for your response
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {pendingForms.map((form) => (
              <div
                key={form.id}
                className={`
                  border
                  rounded-lg
                  p-4
                  transition-colors
                  ${patientTheme.divider}
                  hover:bg-[#FFF3E5]
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`
                          font-semibold
                          ${patientTheme.textMain}
                        `}
                      >
                        {form.title}
                      </h4>
                      <Badge
                        variant="secondary"
                        className={`
                          gap-1
                          ${patientTheme.badgeBg}
                          ${patientTheme.badgeText}
                          border-none
                        `}
                      >
                        <Clock className="h-3 w-3" />
                        Pending
                      </Badge>
                    </div>
                    <p className={`text-sm ${patientTheme.textMuted}`}>
                      {form.doctor ? `From Dr. ${form.doctor.name} • ` : ""}
                      {formatDate(form.created_at)}
                    </p>
                  </div>
                  <Link href={`/patient/forms/${form.id}`}>
                    <Button className="gap-2">
                      Fill Out
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Completed Forms */}
      {completedForms.length > 0 && (
        <Card
          className={`
            ${patientTheme.cardBg}
            ${patientTheme.cardBorder}
            border
            rounded-xl
            shadow-sm
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
              <CheckCircle className="h-5 w-5 text-[#16A34A]" />
              Completed Forms
            </CardTitle>
            <CardDescription className={patientTheme.textMuted}>
              {completedForms.length} form
              {completedForms.length !== 1 ? "s" : ""} submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {completedForms.map((form) => (
              <div
                key={form.id}
                className={`
                  border
                  rounded-lg
                  p-4
                  ${patientTheme.divider}
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`
                          font-semibold
                          ${patientTheme.textMain}
                        `}
                      >
                        {form.title}
                      </h4>
                      <Badge
                        variant="default"
                        className="gap-1 bg-[#DCFCE7] text-[#166534] border-none"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </Badge>
                    </div>
                    <p className={`text-sm ${patientTheme.textMuted}`}>
                      Submitted: {formatDate(form.submitted_at!)}
                    </p>
                  </div>
                  <Link href={`/patient/forms/${form.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
