import * as React from "react";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import useAuthStore from "@/stores/authStore";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Customers management",
      url: "/admin/customers",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Products management",
      url: "/admin/products",
      icon: Bot,
    },
    {
      title: "Categories management",
      url: "/admin/categories",
      icon: BookOpen,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore.getState().userDetail!;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
