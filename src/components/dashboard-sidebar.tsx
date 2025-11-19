"use client";

import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
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
  Activity,
  Calendar,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { doctorTheme } from "@/lib/theme/doctor";

interface DashboardSidebarProps {
  user: User;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
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
      href: "/dashboard",
    },
    {
      icon: Activity,
      label: "Activities",
      href: "/dashboard/activities",
    },
    {
      icon: Calendar,
      label: "Schedule",
      href: "/dashboard/schedule",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <Sidebar
      className={`
        ${doctorTheme.cardBg}
        ${doctorTheme.cardBorder}
        border-r
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
                  ${doctorTheme.brandAccentBg}
                  ${doctorTheme.brandAccentBorder}
                  border
                `}
              >
                <Activity className={`h-4 w-4 ${doctorTheme.brandSoft}`} />
              </div>
              <span
                className={`
                  font-semibold
                  text-sm
                  ${doctorTheme.textMain}
                `}
              >
                Trace
              </span>
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
                mx-auto
                ${doctorTheme.brandAccentBg}
                ${doctorTheme.brandAccentBorder}
                border
              `}
            >
              <Activity className={`h-4 w-4 ${doctorTheme.brandSoft}`} />
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
                  rounded-md
                  text-sm
                  cursor-pointer
                  transition-colors
                  ${
                    isActive
                      ? `${doctorTheme.brandAccentBg} ${doctorTheme.brand} border ${doctorTheme.brandAccentBorder}`
                      : `${doctorTheme.textMuted} hover:bg-[#F3F6FF]`
                  }
                `}
              >
                <Icon
                  className={`
                    h-5
                    w-5
                    ${isActive ? doctorTheme.brandSoft : doctorTheme.textSubtle}
                  `}
                />
                {!collapsed && (
                  <span
                    className={`
                      truncate
                      ${isActive ? doctorTheme.brand : doctorTheme.textMuted}
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
          {!collapsed && (
            <div className="px-3 py-2 space-y-1 border-t border-dashed border-[#E5E7EB] mt-2">
              <div className="flex items-center gap-2">
                <UserIcon className={`h-4 w-4 ${doctorTheme.textSubtle}`} />
                <p
                  className={`
                    text-sm
                    font-medium
                    truncate
                    ${doctorTheme.textMain}
                  `}
                >
                  {user.email}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 px-2 pt-2">
            <SidebarTrigger />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sign out"
              className={doctorTheme.textMuted}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
