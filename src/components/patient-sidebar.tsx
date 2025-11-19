"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  Home,
  FileText,
  Calendar,
  Settings,
  LogOut,
  User as UserIcon,
  Activity,
} from "lucide-react";
import { patientTheme } from "@/lib/theme/patient";

interface PatientSidebarProps {
  patient: any;
}

export function PatientSidebar({ patient }: PatientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/patient/dashboard",
    },
    {
      icon: FileText,
      label: "My Records",
      href: "/patient/records",
    },
    {
      icon: Calendar,
      label: "Appointments",
      href: "/patient/appointments",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/patient/settings",
    },
  ];

  return (
    <Sidebar
      className={`
        border-r
        ${patientTheme.cardBorder}
        ${patientTheme.cardBg}
      `}
    >
      <SidebarHeader>
        <div className="flex items-center justify-between w-full px-2 py-2">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  ${patientTheme.brandAccentBg}
                  ${patientTheme.brandAccentBorder}
                  border
                `}
              >
                <Activity className={`h-4 w-4 ${patientTheme.brandSoft}`} />
              </div>
              <div className="leading-tight">
                <span
                  className={`font-semibold text-sm ${patientTheme.textMain}`}
                >
                  Trace
                </span>
                <p className={`text-xs ${patientTheme.textSubtle}`}>
                  Patient Portal
                </p>
              </div>
            </div>
          )}

          {collapsed && (
            <div
              className={`
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                ${patientTheme.brandAccentBg}
                ${patientTheme.brandAccentBorder}
                border
                mx-auto
              `}
            >
              <Activity className={`h-4 w-4 ${patientTheme.brandSoft}`} />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem
                key={item.href}
                isActive={isActive}
                onClick={() => router.push(item.href)}
                className={`
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  text-sm
                  cursor-pointer
                  transition-colors
                  ${
                    isActive
                      ? `${patientTheme.brandAccentBg} ${patientTheme.brand} border ${patientTheme.brandAccentBorder}`
                      : `text-sm ${patientTheme.textMuted} hover:bg-[#FFF3E5]`
                  }
                `}
              >
                <Icon
                  className={`
                    h-5
                    w-5
                    ${
                      isActive
                        ? patientTheme.brandSoft
                        : patientTheme.textSubtle
                    }
                  `}
                />
                {!collapsed && (
                  <span
                    className={`
                      truncate
                      ${isActive ? patientTheme.brand : patientTheme.textMuted}
                    `}
                  >
                    {item.label}
                  </span>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-2 pb-3">
          {!collapsed && patient && (
            <div className="px-3 py-2 space-y-1 border-t pt-3 mt-2 border-dashed border-[#FFE3CC]">
              <div className="flex items-center gap-2">
                <UserIcon className={`h-4 w-4 ${patientTheme.textSubtle}`} />
                <p
                  className={`
                    text-sm
                    font-medium
                    truncate
                    ${patientTheme.textMain}
                  `}
                >
                  {patient.name}
                </p>
              </div>
              <p
                className={`
                  text-xs
                  truncate
                  ${patientTheme.textMuted}
                `}
              >
                {patient.email}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 px-2 pt-2">
            <SidebarTrigger />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sign out"
              className={`
                hover:bg-[#FFF3E5]
                ${patientTheme.textMuted}
              `}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
